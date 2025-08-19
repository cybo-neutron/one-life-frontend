import React from "react";
import SideNav from "../components/SideNav";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-secondary-900 overflow-x-hidden h-screen w-screen">
      <div className="z-0 absolute bottom-20 left-20 h-60 w-60 bg-fuchsia-800/10 rounded-full backdrop-blur-xl filter blur-2xl "></div>
      {/* <div className="absolute bottom-1/12 left-20 h-1/2 w-1/2 bg-amber-500/10  backdrop-blur-xl filter blur-2xl "></div> */}
      <div className="z-0 absolute bottom-0 left-0 h-60 w-60 bg-gradient-to-tr from-lime-300/10 to-orange-500/10 rounded-full  backdrop-blur-xl filter blur-2xl "></div>
      {/* <div className="absolute bottom-2/12 left-32 h-60 w-60 bg-lime-500/10 rounded-full backdrop-blur-xl filter blur-2xl "></div> */}

      <div className="p-2 h-full w-full flex gap-2">
        <SideNav />
      <div className="z-1 flex-1 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
