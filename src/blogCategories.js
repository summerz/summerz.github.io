// 블로그 카테고리 정의. 티스토리 시절 카테고리가 마이그레이션 과정에서
// 태그로 넘어왔기 때문에, 같은 이름의 태그를 다시 '카테고리'로 승격시켜
// 따로 노출한다 (태그 페이지 상단 섹션, 블로그 사이드바).
//
// 이 목록은 고정이다. 여기서 카테고리를 추가/삭제하면
// scripts/generate-blog-categories.js 가 빌드 때 글 수를 세어
// src/generated/blogCategoryCounts.json 으로 만들어 준다.
//
// permalink는 Docusaurus가 문자열 태그에 붙이는 slug(lodash.kebabCase)를
// 그대로 따라간다. 빌드 결과물(build/blog/tags/)과 대조해서 확인한 값이라,
// 태그 이름을 바꾸지 않는 한 하드코딩해도 안전하다.
//
// 'drafts (private)'는 비공개 카테고리라 일부러 뺐다.
export const blogCategories = [
  {label: 'media & world', permalink: '/blog/tags/media-world'},
  {label: 'lovely cinema', permalink: '/blog/tags/lovely-cinema'},
  {label: 'my life in Sydney', permalink: '/blog/tags/my-life-in-sydney'},
  {label: 'my view & mind', permalink: '/blog/tags/my-view-mind'},
  {label: 'recharge my life', permalink: '/blog/tags/recharge-my-life'},
  {label: 'for blah.blah.blog', permalink: '/blog/tags/for-blah-blah-blog'},
  {label: 'audio & sound', permalink: '/blog/tags/audio-sound'},
  {label: 'hooked on music', permalink: '/blog/tags/hooked-on-music'},
  {label: 'something useful', permalink: '/blog/tags/something-useful'},
];
