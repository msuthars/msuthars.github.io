/* Inject the server-rendered pages into the built HTML so crawlers see the content.
   Every portfolio section gets its own page (dist/quests/index.html…), so its URL works
   when opened directly or reloaded on GitHub Pages, which has no server-side routing. */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const site = "https://msuthars.github.io";
const { render, renderResume, sections, sectionPath, sectionTitle } = await import(
  pathToFileURL(`${root}dist-ssr/entry-server.js`).href
);

const placeholder = '<div id="root"></div>';

async function readTemplate(page) {
  const html = await readFile(`${root}dist/${page}`, "utf8");
  if (!html.includes(placeholder)) throw new Error(`#root placeholder not found in ${page}`);
  return html;
}

async function write(page, html) {
  const file = `${root}dist/${page}`;
  await mkdir(file.slice(0, file.lastIndexOf("/")), { recursive: true });
  await writeFile(file, html);
  console.log(`Pre-rendered dist/${page}`);
}

/* Portfolio: one page per section, with its own title and canonical URL */
const template = await readTemplate("index.html");
for (const { id } of sections) {
  const path = sectionPath(id);
  const url = `${site}${path}`;
  const title = sectionTitle(id);
  const html = template
    .replace(placeholder, `<div id="root">${render(path)}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  await write(`${path.slice(1)}index.html`, html);
}

/* Resume */
const resume = await readTemplate("resume/index.html");
await write("resume/index.html", resume.replace(placeholder, `<div id="root">${renderResume()}</div>`));

await rm(`${root}dist-ssr`, { recursive: true, force: true });
