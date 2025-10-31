import { Outlet } from "@tanstack/react-router";
import { WAButton } from "../shared/WAButton";

export function LandingPageLayout() {
  return (
    <>
      <div className="max-w-full">
        <Outlet />
        <WAButton />
      </div>
    </>
  );
}
