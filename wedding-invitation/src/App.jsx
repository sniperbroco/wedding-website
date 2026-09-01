import WeddingInvitation from "./pages/WeddingInvitation";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const path = window.location.pathname.toLowerCase();

  if (path === "/admin" || path.startsWith("/admin/")) {
    return <AdminDashboard />;
  }

  return <WeddingInvitation />;
}
