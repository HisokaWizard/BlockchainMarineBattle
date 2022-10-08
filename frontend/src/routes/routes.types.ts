import { ComponentType } from "react";

export type RoutePath = "/" | "/chat" | "/graphics" | "/login";

export interface RouteItem {
  path: RoutePath | string;
  component: ComponentType;
}
