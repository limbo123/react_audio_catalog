import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
