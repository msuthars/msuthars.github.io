/* Inject the server-rendered app into dist/index.html so crawlers see the content */
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const { render } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href);

const file = `${root}dist/index.html`;
const html = await readFile(file, "utf8");
if (!html.includes('<div id="root"></div>')) throw new Error("#root placeholder not found");

await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`));
await rm(`${root}dist-ssr`, { recursive: true, force: true });
console.log("Pre-rendered dist/index.html");
