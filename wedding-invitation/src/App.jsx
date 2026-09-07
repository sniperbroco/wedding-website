import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import WeddingInvitation from "./pages/WeddingInvitation";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const path = window.location.pathname.toLowerCase();

  return (
    <>
      <WeddingInvitation />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
