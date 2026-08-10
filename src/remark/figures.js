/**
 * 이미지와 임베드 링크에 캡션 상자(.mdFigure)를 씌운다.
 *
 * 규칙은 하나다 - 문단의 첫 줄이 이미지 하나 또는 임베드 링크 하나뿐이면,
 * 그 문단의 나머지 줄이 캡션이다.
 *
 *   ![](./x.jpg)                                  https://www.youtube.com/watch?v=y8AWFf7EAc4
 *   사진출처: 씨네21                                 Jeff Buckley - Hallelujah
 *
 * 캡션을 붙이고 싶지 않으면 빈 줄로 띄운다. 옛 문법 `![](./x.jpg "설명")` 도
 * 그대로 동작한다(다음 줄 캡션이 있으면 그쪽이 이긴다).
 *
 * 첫 줄이 URL 하나로만 이루어져 있을 때만 임베드로 바꾼다.
 *   - 문장 중간에 인용한 링크는 그대로 둔다.
 *   - [제목](주소) 처럼 링크 텍스트가 따로 있으면 그대로 둔다. 임베드로 바꾸면
 *     글쓴이가 붙인 제목이 사라진다(유튜브 10글, 트위터 16곳).
 *   - 이미 손으로 <iframe>/<blockquote> 를 넣어둔 글은 링크가 아니라 영향 없다.
 *
 * beforeDefaultRemarkPlugins 로 등록하므로 Docusaurus 의 이미지 변환과 GFM
 * 자동링크가 돌기 전이다. 그래서 이미지는 아직 image 노드고, 링크는 맨 텍스트
 * 노드로 온다(<...> 로 감싼 경우에만 link 노드). 셋 다 받는다.
 *
 * 트윗 카드는 docusaurus.config.js 가 전역으로 불러오는 platform.twitter.com
 * widgets.js 가 그린다. 트윗이 지워졌으면 링크 그대로 남는다.
 */
const YOUTUBE =
  /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:\S*&)?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})(?:[?&#]\S*)?$/;
const TWEET =
  /^https?:\/\/(?:www\.|mobile\.)?(?:twitter\.com|x\.com)\/[^/\s]+\/status(?:es)?\/(\d+)(?:[?#/]\S*)?$/;

const EMBEDS = [
  {
    match: YOUTUBE,
    html: (id) =>
      `<div class="ytEmbed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" ` +
      `title="YouTube video player" loading="lazy" frameborder="0" ` +
      `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ` +
      `referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`,
  },
  {
    match: TWEET,
    html: (_id, url) =>
      `<blockquote class="twitter-tweet"><a href="${url}">${url}</a></blockquote>`,
  },
];

function embedHtml(url) {
  for (const {match, html} of EMBEDS) {
    const m = match.exec(url);
    if (m) return html(m[1], url);
  }
  return null;
}

// 캡션 앞머리의 줄바꿈 자국(하드브레이크, 공백뿐인 텍스트)을 걷어낸다.
function trimLead(nodes) {
  const out = nodes.slice();
  while (
    out.length &&
    (out[0].type === 'break' ||
      (out[0].type === 'text' && !out[0].value.trim()))
  ) {
    out.shift();
  }
  if (out.length && out[0].type === 'text') {
    out[0] = {...out[0], value: out[0].value.replace(/^\s+/, '')};
  }
  return out;
}

// 캡션은 "다음 줄" 일 때만 성립한다. 옛 글에는 `![](x.jpg)곧바로 본문` 처럼
// 이미지 뒤 같은 줄에 글이 이어지는 경우가 많은데, 그건 캡션이 아니다.
// 줄이 바뀌었으면 캡션 노드들을, 같은 줄이면 null 을 돌려준다.
function nextLine(nodes) {
  const [first] = nodes;
  if (!first) return [];
  if (first.type === 'break') return trimLead(nodes); // 공백 두 칸 줄바꿈
  if (first.type === 'text' && /^[^\S\n]*\n/.test(first.value)) {
    return trimLead(nodes);
  }
  return null;
}

function hasImage(node) {
  return (
    node.type === 'image' || (node.children || []).some(hasImage)
  );
}

// 문단 첫 줄이 이미지/임베드면 {lead, caption}, 아니면 null.
function leadAndCaption(paragraph) {
  const [first, ...rest] = paragraph.children;
  if (!first) return null;

  if (first.type === 'image') {
    let caption = nextLine(rest);
    if (caption === null) return null;
    if (!caption.length && first.title) {
      caption = [{type: 'text', value: first.title}];
    }
    first.title = null;
    return {lead: {type: 'paragraph', children: [first]}, caption};
  }

  let url;
  let caption;
  if (first.type === 'text') {
    const nl = first.value.indexOf('\n');
    url = (nl === -1 ? first.value : first.value.slice(0, nl)).trim();
    if (nl === -1) {
      caption = nextLine(rest);
      if (caption === null) return null;
    } else {
      const tail = first.value.slice(nl + 1).replace(/^\s+/, '');
      caption = tail ? [{...first, value: tail}, ...rest] : trimLead(rest);
    }
  } else if (first.type === 'link') {
    // <주소> 자동링크는 텍스트가 곧 주소라서 바꿔도 잃는 게 없다.
    const label =
      first.children.length === 1 && first.children[0].type === 'text'
        ? first.children[0].value.trim()
        : null;
    if (label !== first.url) return null;
    url = first.url;
    caption = nextLine(rest);
    if (caption === null) return null;
  } else {
    return null;
  }

  const html = url && embedHtml(url);
  return html ? {lead: {type: 'html', value: html}, caption} : null;
}

function walk(node) {
  const children = node.children;
  if (!children) return;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    walk(child);
    if (child.type !== 'paragraph') continue;

    const found = leadAndCaption(child);
    // 캡션 자리에 이미지가 또 있으면 캡션이 아니라 줄줄이 붙은 이미지들이다.
    if (!found || found.caption.some(hasImage)) continue;

    const isEmbed = found.lead.type === 'html';
    if (!found.caption.length) {
      // 캡션이 없으면 상자를 씌우지 않는다. 이미지는 원래 문단 그대로 둔다.
      if (isEmbed) children[i] = found.lead;
      continue;
    }
    children.splice(
      i,
      1,
      {
        type: 'html',
        value: `<figure class="mdFigure${isEmbed ? ' mdFigure--embed' : ''}">`,
      },
      found.lead,
      {type: 'html', value: '<figcaption>'},
      {type: 'paragraph', children: found.caption},
      {type: 'html', value: '</figcaption></figure>'},
    );
    i += 4;
  }
}

module.exports = function figures() {
  return (tree) => walk(tree);
};
