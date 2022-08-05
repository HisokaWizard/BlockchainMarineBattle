import * as React from "react";
import { createRoot } from "react-dom/client";
import { GeneralPage } from "../src/pages/GeneralPage";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<GeneralPage />);
