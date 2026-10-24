import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/styles.css";
import "./CSS/carrito.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
