import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import App from "./App";
// import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
// gsap.registerPlugin(MorphSVGPlugin);

axios.defaults.baseURL = "https://app-audio.herokuapp.com/api";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
