/**
 * 글 상세 / 글 목록에서 a, d 로 페이지 이동.
 *   a -> 왼쪽 링크 (Newer Post / Newer Entries)
 *   d -> 오른쪽 링크 (Older Post / Older Entries)
 *
 * 두 페이지 타입 모두 pagination-nav__link--prev/--next 클래스를 쓰므로
 * 링크를 찾아 click() 한다. Docusaurus 의 Link 가 렌더한 <a> 라서
 * 클릭하면 전체 새로고침 없이 클라이언트 라우팅으로 이동한다.
 */
const KEYS = {a: '.pagination-nav__link--prev', d: '.pagination-nav__link--next'};

function isTyping(el) {
  if (!el) return false;
  if (el.isContentEditable) return true;
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
}

if (typeof document !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    // 조합키는 브라우저/OS 단축키와 겹치므로 제외
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (isTyping(e.target)) return;

    const selector = KEYS[e.key.toLowerCase()];
    if (!selector) return;

    const link = document.querySelector(selector);
    if (!link) return; // 첫 글/마지막 글에는 한쪽 링크가 없다

    e.preventDefault();
    link.click();
  });
}
