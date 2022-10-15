import {
  ChatPage,
  GeneralPage,
  GraphicsPage,
  LoginPage,
  RegistrationPage,
} from "../pages";
import { RouteItem } from "./routes.types";

export const routes: RouteItem[] = [
  { path: "/", component: GeneralPage },
  { path: "/chat/:id", component: ChatPage },
  { path: "/graphics", component: GraphicsPage },
  { path: "/login", component: LoginPage },
  { path: "/registration", component: RegistrationPage },
];
