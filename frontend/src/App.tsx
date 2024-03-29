import * as React from "react";
import { createRoot } from "react-dom/client";
import { AppWrapper } from "./AppWrapper";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<AppWrapper />);
