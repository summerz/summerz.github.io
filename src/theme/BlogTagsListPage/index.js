import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import TagsListByLetter from '@theme/TagsListByLetter';
import SearchMetadata from '@theme/SearchMetadata';
import Heading from '@theme/Heading';
import {blogCategories} from '../../blogCategories';
import blogCategoryCounts from '../../generated/blogCategoryCounts.json';
import styles from './styles.module.css';

export default function BlogTagsListPage({tags, sidebar}) {
  // 기본 테마의 제목("Tags") 대신 한국어로 고정한다 - 사이트 전체가
  // 한국어 UI이고 i18n을 쓰지 않으므로 translate() 체인이 불필요하다.
  const title = '태그';

  // 카테고리 목록은 고정이고, 글 수는 빌드 때
  // scripts/generate-blog-categories.js 가 세어 JSON 으로 남긴 값을 쓴다.
  const categories = blogCategories.map(({label, permalink}) => ({
    label,
    permalink,
    count: blogCategoryCounts[label] ?? 0,
  }));
  const categoryLabels = new Set(categories.map((cat) => cat.label));
  const plainTags = tags.filter((tag) => !categoryLabels.has(tag.label));

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_list" />
      <BlogLayout sidebar={sidebar}>
        <Heading as="h1">{title}</Heading>

        {categories.length > 0 && (
          <section className="margin-vert--lg">
            <Heading as="h2">카테고리</Heading>
            <p>예전 블로그에서 쓰던 카테고리입니다.</p>
            <div className={styles.categoryGrid}>
              {categories.map((category) => (
                <Link
                  key={category.permalink}
                  to={category.permalink}
                  className={styles.categoryCard}>
                  <span className={styles.categoryLabel}>
                    {category.label}
                  </span>
                  <span className={styles.categoryCount}>
                    ({category.count})
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="margin-vert--lg">
          <Heading as="h2">태그</Heading>
          {/* 카테고리는 위에서 이미 보여줬으니 알파벳 목록에서는 뺀다 */}
          <TagsListByLetter
            tags={tags.filter((tag) => !categoryLabels.has(tag.label))}
          />
        </section>
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
