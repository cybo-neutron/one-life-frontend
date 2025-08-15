import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import Pomodoro from "./pomodoro";
import Dashboard from "./dashboard";
import SideNav from "../components/SideNav";
import RootLayout from "./layout";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

const dashboardRoute = createRoute({
  path: "/dashboard",
  getParentRoute: () => rootRoute,
  component: () => (
    <>
      <RootLayout>
        <Dashboard />
      </RootLayout>
    </>
  ),
});

const pomodoroRoute = createRoute({
  path: "/pomodoro",
  getParentRoute: () => rootRoute,
  component: () => (
    <>
      <RootLayout>
        <Pomodoro />
      </RootLayout>
    </>
  ),
});

const routeTree = rootRoute.addChildren([pomodoroRoute, dashboardRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    routes: typeof routeTree;
  }
}

export { router };
