import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
