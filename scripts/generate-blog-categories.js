// 블로그 원본(frontmatter 태그)을 스캔해 카테고리별 글 수를 세어
// src/generated/blogCategoryCounts.json 으로 기록한다.
// npm run build / npm start 에서 docusaurus 앞에 실행된다.
//
// 카테고리 목록의 단일 출처는 src/blogCategories.js 다. 여기서는 그 파일에서
// label/permalink 쌍을 읽어 쓴다(스크립트는 CommonJS라 ESM 파일을 require 할
// 수 없으므로 정규식으로 추출한다).
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function readCategories() {
  const src = fs.readFileSync(
    path.join(root, 'src/blogCategories.js'),
    'utf8',
  );
  const pattern = /label:\s*'([^']+)',\s*permalink:\s*'([^']+)'/g;
  const categories = [];
  let match;
  while ((match = pattern.exec(src)) !== null) {
    categories.push({label: match[1], permalink: match[2]});
  }
  if (!categories.length) {
    throw new Error(
      'src/blogCategories.js 에서 카테고리를 읽지 못했습니다. ' +
        "파일 형식(label: '...', permalink: '...')이 바뀌었는지 확인하세요.",
    );
  }
  return categories;
}

function listMarkdownFiles(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...listMarkdownFiles(full));
    } else if (/\.mdx?$/.test(entry.name)) {
      result.push(full);
    }
  }
  return result;
}

// 프론트매터의 tags 목록(- 항목, 따옴표 유무 무관)을 뽑아낸다.
// draft: true 인 글은 배포 빌드에도 안 나오므로 세지 않는다.
function extractTags(content) {
  const frontMatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontMatter) return null;
  const fm = frontMatter[1];
  if (/^draft:\s*true\b/m.test(fm)) return null;
  const tagsBlock = fm.match(/^tags:\r?\n((?:[ \t]+-[^\n]*\r?\n?)+)/m);
  if (!tagsBlock) return null;
  const tags = [];
  for (let line of tagsBlock[1].split('\n')) {
    line = line.trim();
    if (!line.startsWith('- ')) continue;
    const tag = line
      .slice(2)
      .trim()
      .replace(/^["']|["']$/g, '')
      .trim();
    if (tag) tags.push(tag);
  }
  return tags;
}

const categories = readCategories();
const counts = Object.fromEntries(categories.map(({label}) => [label, 0]));

let scanned = 0;
for (const file of listMarkdownFiles(path.join(root, 'blog'))) {
  const tags = extractTags(fs.readFileSync(file, 'utf8'));
  if (!tags) continue;
  scanned += 1;
  for (const {label} of categories) {
    if (tags.includes(label)) counts[label] += 1;
  }
}

const outPath = path.join(root, 'src/generated/blogCategoryCounts.json');
fs.mkdirSync(path.dirname(outPath), {recursive: true});
fs.writeFileSync(outPath, `${JSON.stringify(counts, null, 2)}\n`);

console.log(`[카테고리] 글 ${scanned}편을 훑어 카테고리 글 수를 갱신했습니다.`);
for (const {label} of categories) {
  console.log(`[카테고리]   ${counts[label]}\t${label}`);
}
