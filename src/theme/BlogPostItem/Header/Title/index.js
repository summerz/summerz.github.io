/**
 * 드래프트 글 제목 위에 DRAFT 표시를 붙인다.
 *
 * 배포 빌드에는 드래프트 글이 아예 들어가지 않으므로(docusaurus.config.js 의
 * processBlogPosts 참고) 이 표시는 개발 서버에서만 보인다. 그래서 환경 분기가
 * 필요 없다.
 */
import React from 'react';
import Title from '@theme-original/BlogPostItem/Header/Title';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

export default function TitleWrapper(props) {
  const {metadata} = useBlogPost();
  return (
    <>
      {metadata.frontMatter.draft && <span className="draftBadge">DRAFT</span>}
      <Title {...props} />
    </>
  );
}
