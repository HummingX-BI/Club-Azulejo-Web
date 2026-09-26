import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { useSectionBackground } from "@/hooks/useSectionBackground";

/* ────────────────────────────────────────────────────────────────
   AppRoot — mounts global hooks before the router renders.
   useSectionBackground watches every <section data-bg="..."> and
   animates --bg-current on :root for a seamless page-tone shift.
   ──────────────────────────────────────────────────────────────── */
function AppRoot() {
  useSectionBackground();
  return <RouterProvider router={router} />;
}

export function App() {
  return <AppRoot />;
}
