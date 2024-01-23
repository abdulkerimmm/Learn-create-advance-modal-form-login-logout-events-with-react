import React from "react";
import ReactDOM from "react-dom/client";
import { Store } from "./components/store/Store";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Store>
    <App />
  </Store>
);
