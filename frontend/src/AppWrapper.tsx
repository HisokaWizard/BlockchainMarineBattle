import * as React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { memo } from "react";
import { Provider } from "react-redux";
import { routes } from "./routes";
import { store } from "./store";

export const AppWrapper = memo(() => {
  return (
    <div>
      <HashRouter>
        <Provider store={store}>
          <Routes>
            {routes.map(({ path, component: Component }) => {
              return <Route key={path} path={path} element={<Component />} />;
            })}
            <Route path={"*"} element={<Navigate replace to={"/"} />} />
          </Routes>
        </Provider>
      </HashRouter>
    </div>
  );
});
