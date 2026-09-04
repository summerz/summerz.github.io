import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useVisibleBlogSidebarItems} from '@docusaurus/plugin-content-blog/client';
import {NavbarSecondaryMenuFiller} from '@docusaurus/theme-common';
import {blogCategories} from '../../../blogCategories';
import blogCategoryCounts from '../../../generated/blogCategoryCounts.json';
import styles from './styles.module.css';
function BlogSidebarMobileSecondaryMenu({sidebar}) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  return (
    <ul className="menu__list">
      {items.map((item) => (
        <li key={item.permalink} className="menu__list-item">
          <Link
            isNavLink
            to={item.permalink}
            className="menu__link"
            activeClassName="menu__link--active">
            {item.title}
          </Link>
        </li>
      ))}
      <li className="menu__list-item">
        <Link to="/blog/archive" className={clsx('menu__link', styles.moreLink)}>
          <b>더 이전 글 보기</b>
        </Link>
      </li>
      <li className={clsx('menu__list-item', styles.categoriesTitle)}>카테고리</li>
      {blogCategories.map((category) => (
        <li key={category.permalink} className="menu__list-item">
          <Link
            isNavLink
            to={category.permalink}
            className="menu__link"
            activeClassName="menu__link--active">
            {category.label}{' '}
            <span className={styles.categoryCount}>
              ({blogCategoryCounts[category.label] ?? 0})
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default function BlogSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={BlogSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}
