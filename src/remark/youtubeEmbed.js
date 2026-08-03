/**
 * 한 줄에 유튜브 링크만 있으면 플레이어로 바꾼다.
 *
 *   https://www.youtube.com/watch?v=y8AWFf7EAc4
 *   -> <div class="ytEmbed"><iframe src="https://www.youtube.com/embed/y8AWFf7EAc4">
 *
 * 문단에 링크 하나만 있을 때만 바꾼다 - 문장 중간에 인용한 링크는 그대로 링크로 둔다.
 * 이미 손으로 <iframe> 을 넣어둔 글(12곳)은 링크가 아니므로 영향받지 않는다.
 *
 * beforeDefaultRemarkPlugins 로 등록하므로 GFM 자동링크가 돌기 전이다. 그래서
 * 맨 텍스트 노드로 오고, <...> 로 감싼 경우에만 link 노드로 온다 - 둘 다 받는다.
 */
const YOUTUBE = /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:\S*&)?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})(?:[?&#]\S*)?$/;

function videoId(url) {
  const m = YOUTUBE.exec(url.trim());
  return m ? m[1] : null;
}

// 문단이 "URL 만" 으로 이루어져 있으면 그 URL, 아니면 null.
//
// [제목](유튜브주소) 처럼 링크 텍스트가 따로 있으면 건드리지 않는다 - 임베드로
// 바꾸면 글쓴이가 붙인 제목이 사라진다(그런 링크가 10글에 있다). <주소> 형태의
// 자동링크는 텍스트가 곧 주소라서 바꿔도 잃는 게 없다.
function soleUrl(paragraph) {
  const kids = paragraph.children.filter(
    (k) => !(k.type === 'text' && !k.value.trim()),
  );
  if (kids.length !== 1) return null;
  const [only] = kids;
  if (only.type === 'text') return only.value.trim();
  if (only.type !== 'link') return null;
  const label = only.children.length === 1 && only.children[0].type === 'text'
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
    const id = url && videoId(url);
    if (!id) continue;

    children[i] = {
      type: 'html',
      value:
        `<div class="ytEmbed"><iframe src="https://www.youtube.com/embed/${id}" ` +
        `title="YouTube video player" loading="lazy" frameborder="0" ` +
        `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ` +
        `referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`,
    };
  }
}

module.exports = function youtubeEmbed() {
  return (tree) => walk(tree);
};
