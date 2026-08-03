import React, {useEffect, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// Blog post `metadata.date` is an ISO string in UTC, e.g. "2007-01-01T23:59:12.000Z".
// We slice it directly instead of going through a `Date` object / Intl formatter so
// the year/month/day never shift with the server or client's local timezone, and
// server-rendered output always matches the first client render byte-for-byte.
function splitDate(dateStr) {
  return {
    year: dateStr.slice(0, 4),
    month: dateStr.slice(5, 7),
    day: dateStr.slice(8, 10),
  };
}

function buildYearIndex(blogPosts) {
  const counts = new Map();
  for (const post of blogPosts) {
    const {year} = splitDate(post.metadata.date);
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([year, count]) => ({year, count}))
    .sort((a, b) => Number(b.year) - Number(a.year));
}

function buildYearDetail(blogPosts, year) {
  const byMonth = new Map();
  for (const post of blogPosts) {
    const parsed = splitDate(post.metadata.date);
    if (parsed.year !== year) {
      continue;
    }
    const monthPosts = byMonth.get(parsed.month) ?? [];
    monthPosts.push(post);
    byMonth.set(parsed.month, monthPosts);
  }
  return Array.from(byMonth.entries())
    .map(([month, posts]) => ({
      month,
      posts: [...posts].sort((a, b) =>
        a.metadata.date < b.metadata.date ? 1 : -1,
      ),
    }))
    .sort((a, b) => Number(b.month) - Number(a.month));
}

// Reads the URL hash after mount only, so the very first client render matches
// the SSR output (always the year index) and React never sees a hydration
// mismatch. `hashchange` also fires for browser back/forward navigation between
// the index and a year, and for the year-detail "back" link below (a plain
// anchor, not a router Link, so the browser handles it as a native fragment
// navigation and reliably fires the event).
function useArchiveYearHash() {
  const [hash, setHash] = useState('');
  useEffect(() => {
    const readHash = () => setHash(window.location.hash.replace(/^#/, ''));
    readHash();
    window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, []);
  return hash;
}

function YearIndex({years}) {
  return (
    <div className={styles.yearGrid}>
      {years.map(({year, count}) => (
        <a key={year} href={`#${year}`} className={styles.yearCard}>
          <span className={styles.yearLabel}>{year}</span>
          <span className={styles.yearCount}>({count})</span>
        </a>
      ))}
    </div>
  );
}

function MonthSection({year, month, posts}) {
  return (
    <section className={styles.monthSection}>
      <Heading as="h3" className={styles.monthTitle}>
        {year}년 {Number(month)}월 ({posts.length})
      </Heading>
      <ul className={styles.postList}>
        {posts.map((post) => {
          const {month: m, day} = splitDate(post.metadata.date);
          return (
            <li key={post.metadata.permalink} className={styles.postItem}>
              <Link to={post.metadata.permalink} className={styles.postLink}>
                <span className={styles.postDate}>
                  {m}/{day}
                </span>
                <span className={styles.postSep}>·</span>
                <span className={styles.postTitle}>{post.metadata.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function YearDetail({year, months}) {
  return (
    <div>
      <a href="#" className={styles.backLink}>
        ← 전체 연도
      </a>
      <Heading as="h2">{year}</Heading>
      {months.map(({month, posts}) => (
        <MonthSection key={month} year={year} month={month} posts={posts} />
      ))}
    </div>
  );
}

export default function BlogArchive({archive}) {
  const hash = useArchiveYearHash();
  const blogPosts = archive.blogPosts;

  const title = translate({
    id: 'theme.blog.archive.title',
    message: '전체 글 아카이브',
    description: 'The page & hero title of the blog archive page',
  });
  const description = translate({
    id: 'theme.blog.archive.description',
    message: '연도별로 정리된 전체 글 목록입니다.',
    description: 'The page & hero description of the blog archive page',
  });

  const years = useMemo(() => buildYearIndex(blogPosts), [blogPosts]);
  const selectedYear = useMemo(
    () => (years.some((y) => y.year === hash) ? hash : null),
    [years, hash],
  );
  const months = useMemo(
    () => (selectedYear ? buildYearDetail(blogPosts, selectedYear) : []),
    [blogPosts, selectedYear],
  );

  return (
    <>
      <PageMetadata title={title} description={description} />
      <Layout>
        <header className="hero hero--primary">
          <div className="container">
            <Heading as="h1" className="hero__title">
              {title}
            </Heading>
            <p className="hero__subtitle">{description}</p>
          </div>
        </header>
        <main className="container margin-vert--lg">
          {selectedYear ? (
            <YearDetail year={selectedYear} months={months} />
          ) : (
            <YearIndex years={years} />
          )}
        </main>
      </Layout>
    </>
  );
}
