import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./Redux-toolkit/Store";
import { Provider } from "react-redux";
import Todo from "./Redux-toolkit/Todo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Todo />
    </Provider>
    <App />
  </React.StrictMode>
);
