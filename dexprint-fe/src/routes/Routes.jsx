/* eslint-disable no-unused-vars */
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { LandingPage } from "../pages/main/landingpage/LandingPage";
import { AdminPageLayout } from "../layouts/adminPageLayout";

const rootRoute = createRootRoute({});

const landingPageLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const adminPageLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPageLayout,
});

const routeTree = rootRoute.addChildren([landingPageLayout, adminPageLayout]);
export const router = createRouter({
  routeTree,
});
