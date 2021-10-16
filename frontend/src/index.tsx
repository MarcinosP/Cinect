import "./globals";
import "./methods";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import axios from "axios";

// translation
// import { I18nextProvider } from "react-i18next";

axios.defaults.baseURL = `127.0.0.1`;
axios.defaults.withCredentials = true;

ReactDOM.render(<App />, document.getElementById("app"));
 