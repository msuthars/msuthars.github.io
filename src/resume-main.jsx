import React from "react";
import { hydrateRoot } from "react-dom/client";
import Resume from "./components/resume/Resume.jsx";

/* #root already holds the pre-rendered resume; hydrate attaches React to it without re-drawing */
hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <Resume />
  </React.StrictMode>
);
