import React from "react";
import * as ReactDOM from "react-dom/client";
import { StartPage } from "./StartPage";

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(<StartPage />);
}
