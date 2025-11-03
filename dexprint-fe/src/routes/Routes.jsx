/* eslint-disable no-unused-vars */
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

import { LandingPage } from "../pages/main/landingpage/LandingPage";
import { AdminPageLayout } from "../layouts/adminPageLayout";
import { LandingPageLayout } from "../layouts/landingPageLayout";
import LoginPage from "../components/auth/LoginPage";
import ProfilePage from "../components/main/admin/Profile/ProfilePage";
import MainContenPage from "../components/main/admin/konten/MainContentPage";
import { store } from "../store";

// Root route (paling atas)
const rootRoute = createRootRoute({});

// Layout utama untuk user / pengunjung
const userLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "user-layout",
  component: LandingPageLayout,
});

// Halaman landing utama
const landingPage = createRoute({
  getParentRoute: () => userLayout,
  path: "/",
  component: LandingPage,
});

// Layout utama untuk admin
const adminLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPageLayout,
  beforeLoad: ({ context }) => {
    const { store } = context;
    const state = store.getState();

    // Cek auth
    if (!state.auth.isAuthenticated) {
      console.warn("UNAUTHORIZED! Redirecting to login...");
      throw redirect({
        to: "/auth/login",
      });
    }
  },
});

// Halaman profil admin
const profilePage = createRoute({
  getParentRoute: () => adminLayout,
  path: "/profile",
  component: ProfilePage,
});
// Halaman manajamen konten
const contentPage = createRoute({
  getParentRoute: () => adminLayout,
  path: "/content",
  component: MainContenPage,
});

// Halaman login
const loginPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: LoginPage,
});

// Gabungkan route menjadi pohon
const routeTree = rootRoute.addChildren([
  userLayout.addChildren([landingPage]),
  adminLayout.addChildren([profilePage, contentPage]),
  loginPage,
]);

export const router = createRouter({
  routeTree,
  context: { store },
});
