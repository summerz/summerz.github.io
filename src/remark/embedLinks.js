/**
 * 한 줄에 링크만 있으면 임베드로 바꾼다. (유튜브 영상, 트위터/X 트윗)
 *
 *   https://www.youtube.com/watch?v=y8AWFf7EAc4   -> 유튜브 플레이어
 *   https://twitter.com/user/status/16267341411   -> 트윗 카드
 *
 * 문단이 URL 하나로만 이루어져 있을 때만 바꾼다.
 *   - 문장 중간에 인용한 링크는 그대로 둔다.
 *   - [제목](주소) 처럼 링크 텍스트가 따로 있으면 그대로 둔다. 임베드로 바꾸면
 *     글쓴이가 붙인 제목이 사라진다(유튜브 10글, 트위터 16곳).
 *   - 이미 손으로 <iframe>/<blockquote> 를 넣어둔 글은 링크가 아니라 영향 없다.
 *
 * beforeDefaultRemarkPlugins 로 등록하므로 GFM 자동링크가 돌기 전이다. 그래서
 * 맨 텍스트 노드로 오고, <...> 로 감싼 경우에만 link 노드로 온다 - 둘 다 받는다.
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
      `<div class="ytEmbed"><iframe src="https://www.youtube.com/embed/${id}" ` +
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
  const trimmed = url.trim();
  for (const {match, html} of EMBEDS) {
    const m = match.exec(trimmed);
    if (m) return html(m[1], trimmed);
  }
  return null;
}

// 문단이 "URL 만" 으로 이루어져 있으면 그 URL, 아니면 null.
function soleUrl(paragraph) {
  const kids = paragraph.children.filter(
    (k) => !(k.type === 'text' && !k.value.trim()),
  );
  if (kids.length !== 1) return null;
  const [only] = kids;
  if (only.type === 'text') return only.value.trim();
  if (only.type !== 'link') return null;
  // <주소> 자동링크는 텍스트가 곧 주소라서 바꿔도 잃는 게 없다.
  const label =
    only.children.length === 1 && only.children[0].type === 'text'
      ? only.children[0].value.trim()
      : null;
  return label === only.url ? only.url : null;
}

function walk(node) {
  const children = node.children;
  if (!children) return;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    walk(child);
    if (child.type !== 'paragraph') continue;

    const url = soleUrl(child);
    const html = url && embedHtml(url);
    if (html) children[i] = {type: 'html', value: html};
  }
}

module.exports = function embedLinks() {
  return (tree) => walk(tree);
};
