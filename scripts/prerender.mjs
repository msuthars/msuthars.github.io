/* Inject the server-rendered pages into the built HTML so crawlers see the content */
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const { render, renderResume } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href);

const pages = [
  ["index.html", render],
  ["resume/index.html", renderResume]
];

for (const [page, renderPage] of pages) {
  const file = `${root}dist/${page}`;
  const html = await readFile(file, "utf8");
  if (!html.includes('<div id="root"></div>')) throw new Error(`#root placeholder not found in ${page}`);

  await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${renderPage()}</div>`));
  console.log(`Pre-rendered dist/${page}`);
}

await rm(`${root}dist-ssr`, { recursive: true, force: true });
