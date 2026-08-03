/**
 * 이미지 title 을 캡션으로 - `![](./x.jpg "설명")` -> <figure><img><figcaption>설명
 *
 * 왜 title 인가: "이미지 다음 줄은 캡션" 같은 추측을 쓰면 그냥 이어지는 본문을
 * 캡션으로 만들어버린다(실제로 이미지 단독 줄 뒤에 텍스트가 오는 경우가 275곳).
 * title 은 글쓴이가 명시적으로 붙이는 표시라 오인할 여지가 없고, 표준 마크다운이라
 * 이 플러그인을 빼도 글이 깨지지 않는다.
 *
 * beforeDefaultRemarkPlugins 로 등록해야 한다 - 도큐사우루스의 기본 이미지 변환이
 * 돌기 전에 봐야 image 노드가 아직 image 노드다.
 */
const ESC = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'};
const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ESC[c]);

function walk(node) {
  const children = node.children;
  if (!children) return;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    walk(child);

    // 이미지 하나만 든 문단이고 title 이 붙어 있을 때만 figure 로 바꾼다.
    if (child.type !== 'paragraph' || child.children.length !== 1) continue;
    const image = child.children[0];
    if (image.type !== 'image' || !image.title) continue;

    const caption = image.title;
    image.title = null; // 툴팁으로 중복해 뜨지 않게

    children.splice(
      i,
      1,
      {type: 'html', value: '<figure class="mdFigure">'},
      {type: 'paragraph', children: [image]},
      {type: 'html', value: `<figcaption>${escapeHtml(caption)}</figcaption></figure>`},
    );
    i += 2;
  }
}

module.exports = function imageFigure() {
  return (tree) => walk(tree);
};
