import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { App } from "./App";

document.getElementById("static-seo-content")?.remove();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// The offline cache (dist/sw.js, written by scripts/lib/service-worker.mjs).
//
// Registered after load so it never competes with the first paint, and only in
// a build — a service worker in front of the dev server serves yesterday's
// bundle and costs an hour to work out. It caches what a visitor actually
// opens: read the guides at home and they are legible in the canyon, where the
// signal is one bar and the advice about path conditions is what you need.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* An unavailable cache is not worth an error in front of a reader. */
    });
  });
}
