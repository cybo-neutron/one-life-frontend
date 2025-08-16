import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import Pomodoro from "./pomodoro";
import Dashboard from "./dashboard";
import RootLayout from "./layout";
import Notes from "./notes";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

const dashboardRoute = createRoute({
  path: "/",
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

const notesRoute = createRoute({
  path : "/notes",
  getParentRoute: () => rootRoute,
  component: () => (
    <>
      <RootLayout>
        <Notes />
      </RootLayout>
    </>
  ),
})

const routeTree = rootRoute.addChildren([pomodoroRoute, dashboardRoute, notesRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    routes: typeof routeTree;
  }
}

export { router };
