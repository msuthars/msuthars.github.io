import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import Resume from "./components/resume/Resume.jsx";

export function render() {
  return renderToString(<App />);
}

/* Wrapped in StrictMode like the client so hydration matches */
export function renderResume() {
  return renderToString(
    <React.StrictMode>
      <Resume />
    </React.StrictMode>
  );
}
