# summerz.net 블로그 리포

Docusaurus 로 만든 개인 블로그다. `main` 에 push 하면 GitHub Actions
(`.github/workflows/deploy.yml`) 가 빌드해서 `gh-pages` 로 배포한다.
`npm run deploy` 를 직접 실행하지 않는다. 배포는 자동이다.

가장 흔한 작업은 **새 글 쓰기** 다. 사용자가 초안·메모·링크를 주면 아래 규칙대로
글을 완성해 커밋한다.

## 새 글 추가하기

파일 경로는 `blog/YYYY/MM/YYYY-MM-DD/index.md` 다. 날짜는 한국 시간 기준 오늘.
같은 날 두 번째 글은 디렉터리를 `YYYY-MM-DD-2` 로 하고 `slug` 도 `YYYY/MM/DD-2` 로 한다.

frontmatter 는 이 형식을 지킨다.

```yaml
---
slug: YYYY/MM/DD
title: <제목>
authors: summerz
tags:
  - "<카테고리 1개>"
  - <자유 태그>
  - <자유 태그>
---
```

- `tags` 의 **첫 항목은 반드시 아래 카테고리 10개 중 하나** 다. 카테고리 목록의 단일
  출처는 `src/blogCategories.js` 이고, `scripts/generate-blog-categories.js` 가 빌드 전에
  이 태그를 세어 카테고리별 글 수를 만든다. 목록에 없는 값을 첫 태그로 쓰면 어느
  카테고리에도 안 잡힌다.

  `media & world` / `lovely cinema` / `my life in Sydney` / `my view & mind` /
  `mind & machine` / `recharge my life` / `for blah.blah.blog` / `audio & sound` /
  `hooked on music` / `something useful`

- `&` 가 들어간 태그는 YAML 에서 따옴표로 감싼다.
- 그 뒤에 자유 태그 1~3개를 붙인다. 한글·영문 섞어도 된다.

본문 구조는 이렇다.

1. frontmatter 바로 아래 도입 문단 1~2개
2. `<!-- truncate -->` 한 줄. 목록 페이지에는 이 줄 위까지만 보인다
3. `##` 소제목으로 나눈 본문
4. 출처가 있으면 마지막에 `## 관련 링크` 섹션, `- [제목](URL)` 목록

커밋 메시지는 `post: <제목>` 형식이다.

## 문체

기존 글을 한두 편 읽고 맞추는 게 가장 정확하다. 핵심만 적으면,

- 존댓말 서술체. `~죠`, `~겁니다`, `~더군요` 같은 구어체 종결이 자연스럽게 섞인다.
- 짧은 문단. 한 문단에 한 생각.
- 용어·신조어·고유명사는 인라인 코드로 감싼다. 예: `meatware`, `human-in-the-loop`
- 냉소와 자조가 옅게 깔린 담담한 톤. 감탄이나 과장은 없다. `(...)` 같은 말줄임을 가끔 쓴다.
- 영어 용어는 첫 등장에 한글 번역을 붙인다. 예: `고기웨어(meatware)`
- 쓰지 않는 것: 이모지, 볼드 강조, 결론 요약 문단, "마치며" 류 마무리.

## 이미지

글에 이미지가 필요하면 글 디렉터리 안에 파일로 두고 상대 경로로 참조한다.
이미지 파일을 새로 만들어낼 수 없는 상황이면 글에 넣지 말고 사용자에게 알린다.

## 검증

글만 추가했다면 빌드까지 돌릴 필요는 없다. 설정·컴포넌트·스크립트를 건드렸다면
`npm ci && npm run build` 로 확인한다.
