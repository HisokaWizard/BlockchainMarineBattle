import * as React from "react";
import { memo } from "react";
import { Provider } from "react-redux";
import { GeneralPage } from "./pages/GeneralPage";
import { store } from "./store";

export const AppWrapper = memo(() => {
  return (
    <div>
      <Provider store={store}>
        <GeneralPage />
      </Provider>
    </div>
  );
});
