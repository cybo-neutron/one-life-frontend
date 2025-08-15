import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { router } from "./routes/routes";
import { RouterProvider } from "@tanstack/react-router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <main className="relative bg-secondary-900 overflow-x-hidden h-screen w-screen">
      <div className="absolute top-20 left-20 h-60 w-60 bg-fuchsia-800/10 rounded-full backdrop-blur-xl filter blur-2xl "></div>
      {/* <div className="absolute bottom-1/12 left-20 h-1/2 w-1/2 bg-amber-500/10  backdrop-blur-xl filter blur-2xl "></div> */}
      <div className="absolute bottom-0 left-0 h-60 w-60 bg-gradient-to-tr from-lime-300/10 to-orange-500/10 rounded-full  backdrop-blur-xl filter blur-2xl "></div>
      {/* <div className="absolute bottom-2/12 left-32 h-60 w-60 bg-lime-500/10 rounded-full backdrop-blur-xl filter blur-2xl "></div> */}

      <RouterProvider router={router} />
      {/* <div className="p-2 h-full w-full flex gap-2">
        <SideNav />

        <div className="w-full h-full grid grid-cols-5 ">
          <div className="h-[300px] w-full bg-secondary-900 col-span-2 shadow-2xl"></div>
        </div>
      </div> */}
    </main>
  </React.StrictMode>
);
