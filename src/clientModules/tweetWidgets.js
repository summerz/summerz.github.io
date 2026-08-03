/**
 * 라우트가 바뀔 때 트윗 카드를 다시 그린다.
 *
 * platform.twitter.com/widgets.js 는 로드될 때 DOM 을 한 번 훑어
 * blockquote.twitter-tweet 을 카드로 바꾼다. Docusaurus 는 SPA 라서 링크를
 * 눌러 들어가면 스크립트가 다시 로드되지 않고, 새로 붙은 blockquote 는 URL
 * 텍스트로 남는다. 하드 리프레시하면 보이던 게 그래서다.
 */
export function onRouteDidUpdate() {
  window.twttr?.widgets?.load();
}
