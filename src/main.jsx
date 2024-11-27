import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import setupAxios from "./setupAxios";
import { RoomsProvider, UserProvider } from "./contexts";
import "./assets/styles/index.scss";

setupAxios();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <RoomsProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </RoomsProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
