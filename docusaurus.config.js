// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkBreaks from 'remark-breaks';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'summerz.net',
  // tagline: 'tagline',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://summerz.net',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'summerz', // Usually your GitHub org/user name.
  projectName: 'summerz.github.io', // Usually your repo name.

  // 복구한 레거시 글도 내부 링크를 검증해 새 회귀가 배포되지 않게 한다.
  onBrokenLinks: 'throw',
  // 레거시 각주 링크는 본문에 직접 넣은 HTML id를 가리킨다. 실제 페이지에서는
  // 정상 동작하지만 Docusaurus의 정적 앵커 수집기가 raw HTML id를 인식하지 못한다.
  onBrokenAnchors: 'ignore',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',

  // 티스토리 원문에 <24>, <CSI> 같은 꺾쇠 제목이 많다. MDX 파서는 이를 JSX 태그로
  // 오인해 빌드를 깨뜨리므로, .md 는 CommonMark 로 파싱하도록 전환한다.
  // (.mdx 는 그대로 MDX 로 파싱됨 - 기존 글은 JSX/import 를 쓰지 않아 안전.)
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  scripts: [
    {src: 'https://platform.twitter.com/widgets.js', async: true, charset: 'utf-8'},
  ],

  clientModules: [
    // a / d 로 이전·다음 글(또는 목록 페이지) 이동
    require.resolve('./src/clientModules/keyboardNav.js'),
    // 클라이언트 라우팅으로 들어온 글의 트윗 카드 다시 그리기
    require.resolve('./src/clientModules/tweetWidgets.js'),
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/summerz/summerz.github.io/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          // 예전 CMS에서 옮겨온 인라인 태그가 수백 개라 tags.yml로
          // 관리하지 않는다. 태그 페이지는 그대로 생성하되 미등록
          // 태그 경고만 끄고, 카테고리 메타데이터만 tags.yml에서 관리한다.
          onInlineTags: 'ignore',
          // 일부 짧은 레거시 글은 본문 전체가 목록 미리보기여도 충분하다.
          // 해당 글마다 의미 없는 truncate 마커를 넣으라는 경고는 끈다.
          onUntruncatedBlogPosts: 'ignore',
          // 기본 이미지 변환/자동링크보다 먼저 돌아야 image·text 노드를 볼 수 있다.
          beforeDefaultRemarkPlugins: [require('./src/remark/figures')],
          // 티스토리에서 옮겨온 글은 한 줄이 한 문장이다. CommonMark 는 개행 1개를
          // 공백으로 흘려보내니 줄 끝 공백 2칸에 의존하게 되는데, 그 2칸은 눈에
          // 안 보여서 손으로 고칠 때마다 지워진다. 개행 1개를 그냥 <br> 로 본다.
          remarkPlugins: [remarkBreaks],
          // 공개 상태는 프론트매터 draft 가 정한다. 없으면 공개, draft: true 면
          // 드래프트(개발 서버에서는 보이고 배포 빌드에서는 빠진다).
          // 태그를 안 단 글은 아직 정리가 덜 된 글이므로 공개를 막는다 - 조용히
          // 빼면 뭐가 빠졌는지 모르니 빌드를 세운다.
          async processBlogPosts({blogPosts}) {
            const bare = blogPosts.filter(
              (p) => !p.metadata.tags.length && !p.metadata.frontMatter.draft,
            );
            if (bare.length) {
              throw new Error(
                `태그 없이 공개된 글이 ${bare.length}편 있습니다. ` +
                  `태그를 달거나 프론트매터에 draft: true 를 넣으세요.\n` +
                  bare
                    .map((p) => `  ${p.metadata.source.replace('@site/', '')}`)
                    .join('\n'),
              );
            }
            return undefined;
          },
          postsPerPage: 10,
          showReadingTime: true,
          blogSidebarCount: 10,
          blogSidebarTitle: 'Recent posts (10)',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/summerz/summerz.github.io/tree/main/packages/create-docusaurus/templates/shared/',
        },
        pages: {
          // remarkPlugins: [
          //   [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          // ],
        },
        theme: {
          // customCss: './src/css/custom.css',
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'https://github.com/summerz.png',
      navbar: {
        title: 'summerz',
        logo: {
          alt: '로고',
          src: 'https://github.com/summerz.png',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/blog/archive', label: '아카이브', position: 'left'},
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        /*
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        */
        copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus now.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'ini'],
      },
    }),
};

export default config;
