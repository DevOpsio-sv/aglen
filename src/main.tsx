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
