import { Provider } from "react-redux";
import { store } from "src/store";
import { ConfigProvider } from "antd";
import theme from "src/theme/themeAntd";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
