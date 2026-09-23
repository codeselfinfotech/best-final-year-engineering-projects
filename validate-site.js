const fs = require('fs');
const path = require('path');
const root = __dirname;
const base = 'https://codeselfinfotech.github.io/best-final-year-engineering-projects';
const verifiedCodeSelf = new Set([
  'https://projects.codeselfinfotech.com/',
  'https://projects.codeselfinfotech.com/projects',
  'https://projects.codeselfinfotech.com/free-projects',
  'https://projects.codeselfinfotech.com/categories',
  'https://projects.codeselfinfotech.com/services',
  'https://projects.codeselfinfotech.com/project-ideas',
  'https://projects.codeselfinfotech.com/categories/ieee-projects',
  'https://projects.codeselfinfotech.com/categories/ai-ml',
  'https://projects.codeselfinfotech.com/categories/web-applications',
  'https://projects.codeselfinfotech.com/categories/iot-embedded',
  'https://projects.codeselfinfotech.com/categories/data-science',
  'https://projects.codeselfinfotech.com/categories/cybersecurity',
  'https://projects.codeselfinfotech.com/categories/cloud-devops',
  'https://projects.codeselfinfotech.com/categories/mobile-apps',
  'https://projects.codeselfinfotech.com/categories/blockchain-web3',
  'https://projects.codeselfinfotech.com/categories/computer-vision-nlp',
  'https://projects.codeselfinfotech.com/categories/robotics-automation',
  'https://projects.codeselfinfotech.com/project-ideas/ai-machine-learning',
  'https://projects.codeselfinfotech.com/project-ideas/cyber-security',
  'https://projects.codeselfinfotech.com/project-ideas/data-science-analytics',
  'https://projects.codeselfinfotech.com/project-ideas/full-stack-web-development',
  'https://projects.codeselfinfotech.com/project-ideas/iot-embedded-systems',
  'https://projects.codeselfinfotech.com/project-ideas/robotics-automation',
  'https://projects.codeselfinfotech.com/project-ideas/ece',
  'https://projects.codeselfinfotech.com/project-ideas/python-projects',
  'https://projects.codeselfinfotech.com/project-ideas/machine-learning',
  'https://projects.codeselfinfotech.com/project-ideas/reinforcement-learning',
  'https://projects.codeselfinfotech.com/project-ideas/generative-ai',
  'https://projects.codeselfinfotech.com/project-ideas/natural-language-processing',
  'https://projects.codeselfinfotech.com/project-ideas/big-data',
  'https://projects.codeselfinfotech.com/project-ideas/computer-vision',
  'https://projects.codeselfinfotech.com/project-ideas/image-processing',
  'https://projects.codeselfinfotech.com/project-ideas/power-electronics',
  'https://projects.codeselfinfotech.com/project-ideas/ai-iot',
  'https://projects.codeselfinfotech.com/project-ideas/internet-of-things-iot',
  'https://projects.codeselfinfotech.com/project-ideas/vlsi-matlab',
  'https://projects.codeselfinfotech.com/project-ideas/mern-stack',
  'https://projects.codeselfinfotech.com/project-ideas/java',
  'https://projects.codeselfinfotech.com/project-ideas/android',
  'https://projects.codeselfinfotech.com/project-ideas/web-development',
  'https://projects.codeselfinfotech.com/project-ideas/cloud-computing',
  'https://projects.codeselfinfotech.com/project-ideas/blockchain-web3',
  'https://projects.codeselfinfotech.com/project-ideas/agriculture',
  'https://projects.codeselfinfotech.com/project-ideas/real-time-problem-solving',
  'https://projects.codeselfinfotech.com/project-ideas/real-time-projects',
  'https://projects.codeselfinfotech.com/project-ideas/cyber-security-project-ideas',
  'https://projects.codeselfinfotech.com/services/final-year-engineering-projects',
  'https://projects.codeselfinfotech.com/services/ieee-projects',
  'https://projects.codeselfinfotech.com/services/academic-project-support',
  'https://projects.codeselfinfotech.com/services/custom-project-development',
  'https://projects.codeselfinfotech.com/services/project-documentation',
  'https://projects.codeselfinfotech.com/services/internship-projects',
  'https://projects.codeselfinfotech.com/services/best-mini-project-ideas',
  'https://projects.codeselfinfotech.com/services/placement-projects',
  'https://projects.codeselfinfotech.com/services/final-year-projects-for-computer-science-with-source-code',
  'https://projects.codeselfinfotech.com/services/cse-final-year-project-ideas-with-source-code',
  'https://projects.codeselfinfotech.com/services/best-ieee-project-center-in-bangalore',
  'https://projects.codeselfinfotech.com/services/ece-final-year-project-ideas-with-source-code',
  'https://projects.codeselfinfotech.com/services/best-final-year-project-center',
  'https://projects.codeselfinfotech.com/services/best-final-year-iot-projects-with-source-code',
  'https://projects.codeselfinfotech.com/services/50-best-bca-final-year-project-ideas-with-source-code',
  'https://projects.codeselfinfotech.com/services/best-project-center-in-bangalore-for-final-year-engineering',
  'https://projects.codeselfinfotech.com/services/engineering-project-makers-bangalore',
  'https://projects.codeselfinfotech.com/services/final-year-engineering-projects-bangalore',
  'https://projects.codeselfinfotech.com/services/best-final-year-project-center-in-bangalore',
  'https://projects.codeselfinfotech.com/services/best-final-year-cse-project-center-in-bangalore',
  'https://projects.codeselfinfotech.com/services/final-year-ece-projects-in-bangalore',
  'https://projects.codeselfinfotech.com/services/mini-project-ideas-for-bca-students',
  'https://projects.codeselfinfotech.com/services/best-mca-mini-projects',
  'https://projects.codeselfinfotech.com/services/best-diploma-projects',
  'https://projects.codeselfinfotech.com/services/best-mca-project-ideas',
  'https://projects.codeselfinfotech.com/services/top-engineering-project-ideas'
]);
const projects = JSON.parse(fs.readFileSync(path.join(root, 'data', 'projects.json'), 'utf8'));
const html = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name === 'index.html') html.push(file);
  }
}
walk(root);
const text = html.map(file => fs.readFileSync(file, 'utf8'));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const ids = projects.map(project => project.id);
const slugs = projects.map(project => project.slug);
const requiredFields = ['id','title','slug','category','department','difficulty','summary','abstract','problem_statement','proposed_solution','key_features','technologies','modules','implementation_approach','expected_output','future_enhancements','keywords','relevant_codeself'];
check(projects.length === 300, `Expected 300 projects, found ${projects.length}`);
check(ids[0] === 'EP-001' && ids.at(-1) === 'EP-300', 'Project IDs are not EP-001 through EP-300');
check(new Set(ids).size === ids.length, 'Duplicate project IDs');
check(new Set(slugs).size === slugs.length, 'Duplicate project slugs');
check(html.length >= 100, `Expected 100+ pages, found ${html.length}`);
check(projects.every(project => requiredFields.every(field => project[field] !== undefined)), 'A project is missing a required field');
check(text.every(page => /<title>[^<]+<\/title>/.test(page)), 'Missing title');
check(text.every(page => /<meta name="description" content="[^"]+"/.test(page)), 'Missing meta description');
check(text.every(page => page.includes('rel="canonical"') && page.includes('og:title') && page.includes('og:description') && page.includes('og:image')), 'Missing canonical or Open Graph metadata');
check(text.every(page => page.includes('twitter:card') && page.includes('twitter:title')), 'Missing Twitter metadata');
check(text.every(page => page.includes('projects.codeselfinfotech.com/')), 'A page is missing a CodeSelf contextual URL');
const externalByPage = text.map(page => [...page.matchAll(/href="(https:\/\/projects\.codeselfinfotech\.com\/[^"#]*)"/g)].map(match => match[1]));
check(externalByPage.every(links => links.length === 1), 'A page does not contain exactly one contextual CodeSelf link');
check(externalByPage.flat().every(url => verifiedCodeSelf.has(url)), 'An external CodeSelf href is not in the verified allowlist');
check(text.every(page => page.includes(`href="${base}/`)), 'A page is missing an internal link');
check(text.filter(page => page.includes('class="crumbs"')).length >= html.length - 1, 'Missing breadcrumbs');
check(text.every(page => page.includes('class="faq')), 'A page is missing an FAQ section');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = (sitemap.match(/<loc>[^<]+/g) || []).map(value => value.slice(5));
check(new Set(urls).size === urls.length, 'Duplicate sitemap URLs');
check(urls.length === html.length, `Sitemap/page count mismatch: ${urls.length}/${html.length}`);
check(urls.every(url => url.startsWith(base)), 'Unexpected sitemap host');
check(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes('Sitemap:'), 'robots.txt missing sitemap');
const titles = text.map(page => (page.match(/<title>([^<]+)/) || [])[1]);
const canonicals = text.map(page => (page.match(/rel="canonical" href="([^"]+)"/) || [])[1]);
check(new Set(titles).size === titles.length, 'Duplicate page titles');
check(new Set(canonicals).size === canonicals.length, 'Duplicate canonical URLs');
check(projects.every(project => fs.existsSync(path.join(root, 'projects', project.slug, 'index.html'))), 'A project detail route is missing');
for (const page of text) {
  for (const match of page.matchAll(/href="(https:\/\/codeselfinfotech\.github\.io\/best-final-year-engineering-projects\/[^"#]+)"/g)) {
    const relative = match[1].replace(`${base}/`, '').replace(/\/$/, '');
    check(relative === '' || fs.existsSync(path.join(root, relative)) || fs.existsSync(path.join(root, relative, 'index.html')), `Broken internal reference: ${match[1]}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`PASS: ${html.length} pages, ${projects.length} projects, ${urls.length} sitemap URLs, ${new Set(titles).size} unique titles.`);
