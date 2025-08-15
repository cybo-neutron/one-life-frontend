import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Pomodoro from "./pomodoro";
import Dashboard from "./dashboard";
import "../App.css";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <main className="relative bg-secondary-900 overflow-x-hidden h-screen w-screen">
        <div className="absolute top-20 left-20 h-60 w-60 bg-fuchsia-800/10 rounded-full backdrop-blur-xl filter blur-2xl "></div>
        {/* <div className="absolute bottom-1/12 left-20 h-1/2 w-1/2 bg-amber-500/10  backdrop-blur-xl filter blur-2xl "></div> */}
        <div className="absolute bottom-0 left-0 h-60 w-60 bg-gradient-to-tr from-lime-300/10 to-orange-500/10 rounded-full  backdrop-blur-xl filter blur-2xl "></div>
        {/* <div className="absolute bottom-2/12 left-32 h-60 w-60 bg-lime-500/10 rounded-full backdrop-blur-xl filter blur-2xl "></div> */}

        {/* <div className="p-2 h-full w-full flex gap-2">
        <SideNav />

        <div className="w-full h-full grid grid-cols-5 ">
          <div className="h-[300px] w-full bg-secondary-900 col-span-2 shadow-2xl"></div>
        </div>
      </div> */}
      </main>
    </>
  ),
});

const dashboardRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => <Dashboard />,
});

const pomodoroRoute = createRoute({
  path: "/pomodoro",
  getParentRoute: () => rootRoute,
  component: () => <Pomodoro />,
});

const routeTree = rootRoute.addChildren([pomodoroRoute, dashboardRoute]);

const router = createRouter({ routeTree });

export { router };
