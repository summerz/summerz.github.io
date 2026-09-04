import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {useVisibleBlogSidebarItems} from '@docusaurus/plugin-content-blog/client';
import {blogCategories} from '../../../blogCategories';
import blogCategoryCounts from '../../../generated/blogCategoryCounts.json';
import styles from './styles.module.css';
export default function BlogSidebarDesktop({sidebar}) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  return (
    <aside className="col col--3">
      {/* sticky 스크롤 컨테이너는 하나로 유지하고, 그 안에 최신 글과
          카테고리 두 개의 nav 를 넣는다 - nav 마다 sticky 를 주면 스크롤 때
          서로 겹친다 */}
      <div className={clsx(styles.sidebar, 'thin-scrollbar')}>
        <nav
          aria-label={translate({
            id: 'theme.blog.sidebar.navAriaLabel',
            message: 'Blog recent posts navigation',
            description: 'The ARIA label for recent posts in the blog sidebar',
          })}>
          <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>
            {sidebar.title}
          </div>
          <ul className={clsx(styles.sidebarItemList, 'clean-list')}>
            {items.map((item) => (
              <li key={item.permalink} className={styles.sidebarItem}>
                <Link
                  isNavLink
                  to={item.permalink}
                  className={styles.sidebarItemLink}
                  activeClassName={styles.sidebarItemLinkActive}>
                  {item.title}
                </Link>
              </li>
            ))}
            <li className={styles.sidebarItem}>
              <Link to="/blog/archive" className={styles.sidebarMoreLink}>
                <b>더 이전 글 보기</b>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className={styles.categoriesNav} aria-label="블로그 카테고리">
          <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>
            카테고리
          </div>
          <ul className={clsx(styles.sidebarItemList, 'clean-list')}>
            {/* 글 수는 빌드 때 생성된 JSON 에서 온다 */}
            {blogCategories.map((category) => (
              <li key={category.permalink} className={styles.sidebarItem}>
                <Link
                  isNavLink
                  to={category.permalink}
                  className={styles.sidebarItemLink}
                  activeClassName={styles.sidebarItemLinkActive}>
                  {category.label}{' '}
                  <span className={styles.categoryCount}>
                    ({blogCategoryCounts[category.label] ?? 0})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
