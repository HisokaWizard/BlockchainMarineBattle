import { ComponentType } from "react";

export type RoutePath = "/" | "/chat" | "/graphics";

export interface RouteItem {
  path: RoutePath;
  component: ComponentType;
}
