#!/usr/bin/env python3
"""티스토리 백업 HTML -> Docusaurus 블로그 마크다운.

    python3 scripts/tistory2md.py --year 2007 [--dry-run]
    python3 scripts/tistory2md.py --all

입력  _tistory/<번호>/<번호>.html  (+ file/ 아래 첨부)
출력  blog/YYYY/MM/YYYY-MM-DD/index.md  (+ 같은 폴더에 이미지)

멱등: blog/ 에 이미 같은 slug 가 있으면 건너뛴다. 중간에 끊겨도 그냥 재실행하면 됨.
그래서 상태 파일이 없다 - blog/ 자체가 상태다.
"""
import argparse
import html
import json
import os
import re
import shutil
import sys

try:
    from markdownify import markdownify
except ImportError:
    sys.exit("markdownify 가 필요합니다:  pip install markdownify")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "_tistory")
BLOG = os.path.join(ROOT, "blog")
FAILED = os.path.join(SRC, "FAILED.txt")

RE_TITLE = re.compile(r'<h2 class="title-article">(.*?)</h2>', re.S)
RE_CAT = re.compile(r'<p class="category">(.*?)</p>', re.S)
RE_DATE = re.compile(r'<p class="date">\s*(\d{4})-(\d{2})-(\d{2})[ T](\d{2}:\d{2}:\d{2})')
RE_ASSET = re.compile(r'(src|href)="([^"]+)"')
RE_IMG_TAG = re.compile(r'<img\b[^>]*>')
RE_A_TAG = re.compile(r'<a\b[^>]*>.*?</a>', re.S)
RE_SRC_ATTR = re.compile(r'\bsrc="([^"]+)"')
RE_HREF_ATTR = re.compile(r'\bhref="([^"]+)"')
# 외부 URL(스킴 있음/프로토콜상대/루트절대/앵커) 판별 - 이런 건 절대 건드리지 않는다.
RE_EXTERNAL = re.compile(r'^(?:[a-zA-Z][\w+.-]*:|//|/|#)')

# 마크다운 이미지/링크 목적지 파싱을 깨뜨리는 문자들 - 물리적 파일명은 그대로
# 두고(공백 유지) 마크다운 안의 참조 문자열만 퍼센트 인코딩한다. 한글 등
# 비ASCII 문자는 인코딩하지 않는다 - 이미 정상 동작하고 읽기도 쉽다.
ASSET_REF_ENCODE = {" ": "%20", "(": "%28", ")": "%29", "<": "%3C", ">": "%3E"}

# 티스토리 "접기/펼치기"(moreless) 태그 잔재.
#
# 원본은  <span class="txt_fold" tt_moretext=" <b>보기</b> " tt_lesstext=" <b>닫기</b> "
# tt_id="1"><div class="moreless_content">본문</div></span>  이었는데, 익스포트가
# tt_moretext 속성값 안의 HTML 을 진짜 태그로 재파싱해버려서 아래처럼 깨졌다:
#
#   <span class="txt_fold"> <b>보기</b> </span>
#   <div class="moreless_content">보기</b> " tt_lesstext=" <b>닫기</b> " tt_id="1">본문...
#
# 즉 moreless_content 여는 태그와 본문 사이에 속성 찌꺼기가 끼어 있다. 닫는
# </div> 는 원래 자리에 남아 있으므로 본문 범위는 건드릴 필요가 없다. 일부 글은
# 통째로 HTML 이스케이프되어 있어 tt_id 뒤가 '>' 가 아니라 '&gt;' 다.
#
# 라벨의 위치는 원본이 어떻게 깨졌느냐에 따라 둘 중 하나다:
#   (a) txt_fold 가 라벨을 살려둔 경우 - 찌꺼기가 `라벨</b> " tt_lesstext=...` 처럼
#       맨 텍스트로 시작한다. 화면에 이미 나온 라벨의 중복이므로 통째로 버린다.
#   (b) txt_fold 가 `<span style=` 만 남기고 깨진 경우 - 찌꺼기가 `<b>라벨</b>` 로
#       시작하며 이게 유일한 라벨이다. 이건 남긴다.
RE_MORELESS_JUNK = re.compile(
    r'(<div class="moreless_content">)(<b>.*?</b>)?.*?tt_id="\d+"\s*(?:>|&gt;)', re.S)

# <ttml ... /> - 티스토리 자체 이미지 마크업. 가리키는 cfileNN.uf@... 이미지는
# 익스포트에 없다(같은 이미지가 바로 앞 <figure class="fileblock"> 로 이미 나온다).
#
# 속성 파싱은 포기하고 '<ttml' 부터 닫는 '/>' 까지를 통째로 잡는다 - tt_caption 값에
# 따옴표와 '>' 가 이스케이프 없이 섞여 있어서(tt_caption="사진출처: <a href="...">씨네21</a>")
# 제대로 된 태그 파싱이 불가능하기 때문. 대신 폭주를 막는 가드를 둔다:
#   - 다른 <ttml 을 건너뛰지 않는다
#   - 600자 안에서 '/>' 를 못 찾으면 포기한다 (속성이 산산조각 나서 닫는 '/>' 가
#     한참 뒤에 있는 글이 하나 있는데, 거기까지 삼키면 본문이 통째로 날아간다)
RE_TTML_TAG = re.compile(r"<ttml\b(?:(?!<ttml).){0,600}?/>", re.S)

# 위 태그도 moreless 와 같은 식으로 깨진 것들이 있다. tt_caption 값에 '>' 가 들어
# 있으면(예: tt_caption="&lt;범죄의 재구성>") 익스포트 파서가 거기서 태그를 닫아버려
# 캡션 뒷부분과 나머지 속성들이 본문으로 샌다:
#
#   ... 느낌이 났다." tt_link1="" tt_w1="200px" tt_h1="" ... />
#
# 캡션 텍스트는 진짜 본문이므로 살리고, 앞의 떠돌이 따옴표부터 '/>' 까지만 지운다.
# RE_TTML_TAG 를 먼저 적용해 멀쩡한 <ttml> 을 없앤 뒤에 써야 한다 - 안 그러면 이
# 정규식이 멀쩡한 태그의 tt_class="..." 부터 갉아먹는다.
RE_TTML_JUNK = re.compile(r'"\s*(?:tt_\w+="[^"]*"\s*)+/?>')


def is_relative(url):
    """외부 URL(http:, mailto:, //, /, #)이 아닌 글 폴더 기준 상대경로인가."""
    return not RE_EXTERNAL.match(url.strip())


def encode_asset_ref(name):
    """마크다운 참조 문자열에서 파싱을 깨뜨리는 문자만 퍼센트 인코딩한다."""
    return "".join(ASSET_REF_ENCODE.get(c, c) for c in name)

# 티스토리 파일첨부 위젯: <a> 안에 블록레벨 div(filename/size)가 중첩돼 있어서
# markdownify 를 거치면 링크 텍스트 중간에 빈 줄이 생기고 무효한 링크가 된다.
# markdownify 에 넘기기 전에 <a href="...">파일명</a> 한 줄로 미리 정리한다.
RE_FILEBLOCK = re.compile(
    r'<figure class="fileblock"[^>]*>\s*<a href="([^"]+)"[^>]*>(.*?)</a>\s*</figure>', re.S)
RE_FILENAME_DIV = re.compile(r'<div class="filename">(.*?)</div>', re.S)
RE_TAG = re.compile(r'<[^>]+>')

BODY_OPEN = '<div class="contents_style">'
# 본문 끝: 태그 블록이 있으면 그 앞까지, 없으면 article-view/area-view 닫는 곳까지.
RE_END_TAGGED = re.compile(r'\s*</div>\s*(?:<br\s*/?>)?\s*<div class="tags">(.*?)</div>', re.S)
RE_END_PLAIN = re.compile(r'\s*</div>\s*(?:<br\s*/?>)?\s*</div>\s*</div>', re.S)


def page_of(post_dir):
    """글 폴더 안의 본문 html. 파일명이 <번호>.html 인 것과 <번호>-<제목>.html 인 것이 섞여 있다."""
    if not os.path.isdir(post_dir):
        return None
    pages = sorted(f for f in os.listdir(post_dir) if f.endswith(".html"))
    return os.path.join(post_dir, pages[0]) if pages else None


def existing_slugs():
    """blog/ 안 모든 md 의 프론트매터 slug. 손으로 옮긴 글을 덮어쓰지 않기 위한 방어."""
    slugs = set()
    for root, _, files in os.walk(BLOG):
        for f in files:
            if not f.endswith(".md"):
                continue
            with open(os.path.join(root, f), encoding="utf-8") as fh:
                for _ in range(20):
                    line = fh.readline()
                    if not line:
                        break
                    if line.startswith("slug:"):
                        slugs.add(line.split(":", 1)[1].strip().strip("/"))
                        break
    return slugs


def parse(path):
    src = open(path, encoding="utf-8", errors="replace").read()
    title, date = RE_TITLE.search(src), RE_DATE.search(src)
    if not title or not date:
        raise ValueError("제목 또는 날짜를 찾지 못함")
    if BODY_OPEN not in src:
        raise ValueError("본문(contents_style) 없음")

    rest = src[src.index(BODY_OPEN) + len(BODY_OPEN):]
    end = RE_END_TAGGED.search(rest)
    if end:
        body, raw_tags = rest[:end.start()], end.group(1)
    else:
        end = RE_END_PLAIN.search(rest)
        body, raw_tags = (rest[:end.start()] if end else rest), ""

    tags = []
    cat = RE_CAT.search(src)
    if cat:
        # ponytail: 대분류만 태그로. 소분류("and more" 류)는 태그 노이즈라 버린다.
        top = html.unescape(cat.group(1)).split("/")[0].strip()
        if top:
            tags.append(top)
    tags += [t.strip() for t in raw_tags.split("#") if t.strip()]

    return html.unescape(title.group(1)).strip(), date.groups(), body, tags


def simplify_fileblocks(body):
    """<figure class="fileblock">...</figure> -> <a href="href">파일명</a> 한 줄.

    파일명은 <div class="filename"> 안의 텍스트를, 없으면 href 의 basename 을 쓴다.
    href 는 그대로 두므로 뒤이은 move_assets() 의 ./상대경로 재작성이 정상 동작한다.
    """
    def repl(m):
        href, inner = m.group(1), m.group(2)
        name_div = RE_FILENAME_DIV.search(inner)
        if name_div:
            name = RE_TAG.sub("", name_div.group(1)).strip()
        else:
            name = ""
        if not name:
            name = os.path.basename(href)
        return f'<a href="{href}">{name}</a>'

    return RE_FILEBLOCK.sub(repl, body)


def move_assets(body, post_dir, out_dir, dry_run):
    """본문의 ./상대경로 첨부를 글 폴더로 복사하고 ./파일명 으로 평탄화.

    원본 첨부가 실제로 존재하지 않으면(티스토리 익스포트 누락) 깨진 참조를
    남기지 않는다 - <img> 는 태그째 제거, <a> 는 링크를 풀고 안쪽 텍스트만 남긴다.
    반환값은 (본문, 제거된 참조 개수).
    """
    taken = {}
    removed = [0]

    def find(rel):
        # HTML 은 ./img/x.gif 또는 img/x.gif 로 쓰지만 실제 파일은
        # <번호>/img/x.gif 나 <번호>/file/img/x.gif 에 있다. normpath 로
        # 정규화해서 ./img/x.gif 와 img/x.gif 가 같은 곳을 가리키게 한다.
        rel = os.path.normpath(rel)
        for cand in (os.path.join(post_dir, rel), os.path.join(post_dir, "file", rel)):
            cand = os.path.normpath(cand)
            if os.path.isfile(cand):
                return cand
        return None

    def strip_missing_img(m):
        tag = m.group(0)
        src = RE_SRC_ATTR.search(tag)
        if not src or not is_relative(src.group(1)) or find(src.group(1)):
            return tag
        removed[0] += 1
        return ""

    def unwrap_missing_a(m):
        tag = m.group(0)
        href = RE_HREF_ATTR.search(tag)
        if not href or not is_relative(href.group(1)) or find(href.group(1)):
            return tag
        removed[0] += 1
        return re.sub(r'^<a\b[^>]*>|</a>$', '', tag, flags=re.S)

    body = RE_IMG_TAG.sub(strip_missing_img, body)
    body = RE_A_TAG.sub(unwrap_missing_a, body)

    def repl(m):
        attr, rel = m.group(1), m.group(2)
        if not is_relative(rel):
            return m.group(0)  # 외부 URL - 손대지 않는다

        cand = find(rel)
        if not cand:
            return m.group(0)  # strip/unwrap 이 먼저 처리해서 도달하지 않아야 정상

        name = os.path.basename(rel)
        while taken.get(name, cand) != cand:
            name = "_" + name
        taken[name] = cand
        if not dry_run:
            shutil.copy2(cand, os.path.join(out_dir, name))
        # 물리 파일명(name)은 공백 그대로 저장 - 마크다운 참조 문자열만 인코딩
        return f'{attr}="./{encode_asset_ref(name)}"'

    body = RE_ASSET.sub(repl, body)
    return body, removed[0]


def frontmatter(title, slug, stamp, tags):
    lines = ["---", f"slug: {slug}", f"title: {json.dumps(title, ensure_ascii=False)}",
             f"date: {stamp}", "authors: summerz"]
    if tags:
        lines.append("tags:")
        lines += [f"  - {json.dumps(t, ensure_ascii=False)}" for t in tags]
    return "\n".join(lines + ["---", ""])


def add_truncate(md):
    """첫 문단 뒤에 <!-- truncate --> 를 삽입한다.

    본문 전체에서 첫 번째 빈 줄에 무조건 삽입하면 링크 텍스트 중간을 잘라 링크가
    깨질 수 있다 ([파일명\\n\\n다운로드](...) 같은 경우). 그래서 그 앞부분의 '[' 와 ']'
    개수가 균형이 맞고(링크 안쪽이 아님) 코드펜스(```) 밖인 빈 줄에만 삽입한다.

    <br> 만으로 줄바꿈된 글은 빈 줄이 아예 없을 수 있다 - 그런 경우 truncate 를
    포기하지 않고 첫 번째 내용 줄 다음에 삽입하는 것으로 폴백한다.

    아주 짧은 글(3줄 이하)은 자를 필요가 없으므로 그대로 둔다.
    """
    if len(md.splitlines()) <= 3:
        return md

    def safe_split_point(prefix):
        return prefix.count("[") == prefix.count("]") and prefix.count("```") % 2 == 0

    for m in re.finditer(r"\n[ \t]*\n", md):
        if safe_split_point(md[:m.start()]):
            head, tail = md[:m.start()], md[m.end():]
            return f"{head}\n\n<!-- truncate -->\n\n{tail}"

    # 균형 맞는 빈 줄이 없음 - 첫 번째 내용 줄 다음에 삽입
    nl = md.find("\n")
    if nl == -1:
        return md
    head, tail = md[:nl], md[nl + 1:]
    return f"{head}\n\n<!-- truncate -->\n\n{tail}"


def convert(post_id, taken_slugs, dry_run):
    post_dir = os.path.join(SRC, post_id)
    title, (y, mo, d, t), body, tags = parse(page_of(post_dir))

    slug, dirname = f"{y}/{mo}/{d}", f"{y}-{mo}-{d}"
    n = 1
    while slug in taken_slugs:  # 같은 날 여러 글
        n += 1
        slug, dirname = f"{y}/{mo}/{d}-{n}", f"{y}-{mo}-{d}-{n}"
    taken_slugs.add(slug)


    out_dir = os.path.join(BLOG, y, mo, dirname)
    if not dry_run:
        os.makedirs(out_dir, exist_ok=True)
    body = RE_MORELESS_JUNK.sub(lambda m: m.group(1) + (m.group(2) or ""), body)
    body = RE_TTML_JUNK.sub("", RE_TTML_TAG.sub("", body))
    body = simplify_fileblocks(body)
    body, removed = move_assets(body, post_dir, out_dir, dry_run)
    md = add_truncate(markdownify(body, heading_style="ATX", strip=["font", "center"]).strip())

    out = frontmatter(title, slug, f"{y}-{mo}-{d}T{t}", tags) + "\n" + md + "\n"
    if not dry_run:
        with open(os.path.join(out_dir, "index.md"), "w", encoding="utf-8") as fh:
            fh.write(out)
    return slug, title, removed


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--year", help="이 연도 글만 변환 (예: 2007)")
    ap.add_argument("--all", action="store_true", help="전체 변환")
    ap.add_argument("--dry-run", action="store_true", help="쓰지 않고 결과만 출력")
    args = ap.parse_args()
    if not args.year and not args.all:
        ap.error("--year 또는 --all 중 하나가 필요합니다")

    already = existing_slugs()
    print(f"기존 글 {len(already)}개 - 같은 날짜 글은 건너뜁니다")

    taken = set(already)  # 이번 실행에서 만든 slug 까지 누적해 중복 방지
    done, skipped, failures, removed_total = 0, [], [], 0
    for post_id in sorted(os.listdir(SRC), key=lambda x: int(x) if x.isdigit() else 0):
        page = page_of(os.path.join(SRC, post_id))
        if not post_id.isdigit() or not page:
            continue
        try:
            date = RE_DATE.search(open(page, encoding="utf-8", errors="replace").read(4000))
            if not date:
                raise ValueError("날짜를 찾지 못함")
            y, mo, d, _ = date.groups()
            if args.year and y != args.year:
                continue
            # 손으로 옮긴 글을 덮어쓰거나 -2 중복으로 되살리지 않는다.
            if f"{y}/{mo}/{d}" in already:
                skipped.append(f"{post_id} ({y}-{mo}-{d})")
                continue
            slug, title, removed = convert(post_id, taken, args.dry_run)
            done += 1
            removed_total += removed
            print(f"  {post_id:>5} -> {slug}  {title[:50]}")
        except Exception as e:  # 이상한 글 하나 때문에 전체가 멈추면 안 된다
            failures.append(f"{post_id}\t{e}")

    if failures and not args.dry_run:
        with open(FAILED, "a", encoding="utf-8") as fh:
            fh.write("\n".join(failures) + "\n")
    if skipped:
        print(f"\n기존 글과 날짜가 겹쳐 건너뜀 {len(skipped)}건: {', '.join(skipped[:10])}"
              + (" ..." if len(skipped) > 10 else ""))
    print(f"\n변환 {done}건, 실패 {len(failures)}건"
          + (f" -> {FAILED}" if failures and not args.dry_run else ""))
    print(f"첨부 원본 없음으로 제거: {removed_total}건")


if __name__ == "__main__":
    main()
