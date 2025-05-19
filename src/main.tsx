import { Provider } from "react-redux";
import { store } from "./store";
import { ConfigProvider } from "antd";
import theme from "../src/theme/themeAntd";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NotificationProvider } from "./context/notificationContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
         <NotificationProvider>
          <App />
         </NotificationProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
