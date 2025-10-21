import { Outlet } from "@tanstack/react-router";

export function LandingPageLayout() {
  return (
    <>
      <div className="max-w-full">
        <Outlet />
      </div>
    </>
  );
}
