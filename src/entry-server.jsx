import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";
import Resume from "./components/resume/Resume.jsx";

/* Route list and titles, used by scripts/prerender.mjs */
export { sections, sectionPath, sectionTitle } from "./data.js";

/* Render the portfolio as it looks at a given URL ("/", "/quests/"…) */
export function render(url) {
  return renderToString(
    <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
      <App />
    </StaticRouter>
  );
}

/* Wrapped in StrictMode like the client so hydration matches */
export function renderResume() {
  return renderToString(
    <React.StrictMode>
      <Resume />
    </React.StrictMode>
  );
}
