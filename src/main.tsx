import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes/routes";
import { RouterProvider } from "@tanstack/react-router";
import "./App.css";
import "./globals.css";
import { PubSubProvider } from "./context/pub_sub/usePubSub";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PubSubProvider>
      <RouterProvider router={router} />
    </PubSubProvider>
  </React.StrictMode>
);
