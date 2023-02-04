import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./shared/store/store";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </Provider>
);
