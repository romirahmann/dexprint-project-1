/* eslint-disable no-unused-vars */
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { LandingPage } from "../pages/main/landingpage/LandingPage";
import { AdminPageLayout } from "../layouts/adminPageLayout";
import { LandingPageLayout } from "../layouts/landingPageLayout";

const rootRoute = createRootRoute({});

const userLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "User-Layout",
  component: LandingPageLayout,
});

const landingPageLayout = createRoute({
  getParentRoute: () => userLayout,
  path: "/",
  component: LandingPage,
});

const adminPageLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPageLayout,
});

const routeTree = rootRoute.addChildren([
  landingPageLayout.addChildren({ userLayout }),
  adminPageLayout,
]);
export const router = createRouter({
  routeTree,
});
