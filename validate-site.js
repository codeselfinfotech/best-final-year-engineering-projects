const fs = require('fs');
const path = require('path');
const root = __dirname;
const base = 'https://codeselfinfotech.github.io/best-final-year-engineering-projects';
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
