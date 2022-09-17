import { ChatPage, GeneralPage, GraphicsPage } from "../pages";
import { RouteItem } from "./routes.types";

export const routes: RouteItem[] = [
  { path: "/", component: GeneralPage },
  { path: "/chat/:id", component: ChatPage },
  { path: "/graphics", component: GraphicsPage },
];
