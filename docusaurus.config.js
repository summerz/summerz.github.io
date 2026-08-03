// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'summerz.net',
  // tagline: 'tagline',
  // favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://summerz.net',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'summerz', // Usually your GitHub org/user name.
  projectName: 'summerz.github.io', // Usually your repo name.

  // 'throw' 였으나, 옛 자체 CMS 시절 글에 ./?pl=NNN 식 내부 링크나 프로토콜 없는
  // 링크(www.foo.com)처럼 진짜로 죽은 링크가 섞여 있어(변환 버그가 아니라 원본
  // 콘텐츠 자체의 문제) 전체 글을 변환하면 빌드가 막힌다. 여전히 경고로는 보이므로
  // 회귀는 계속 눈에 띈다.
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',

  // 티스토리 원문에 <24>, <CSI> 같은 꺾쇠 제목이 많다. MDX 파서는 이를 JSX 태그로
  // 오인해 빌드를 깨뜨리므로, .md 는 CommonMark 로 파싱하도록 전환한다.
  // (.mdx 는 그대로 MDX 로 파싱됨 - 기존 글은 JSX/import 를 쓰지 않아 안전.)
  markdown: {
    format: 'detect',
  },

  scripts: [
    {src: 'https://platform.twitter.com/widgets.js', async: true, charset: 'utf-8'},
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
      },
    }),
};

export default config;
