import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { WixClientProvider } from "./context/WixContext.jsx";

const helmetContext = {};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <WixClientProvider>
        <App />
      </WixClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
