import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useStore } from "../context/storeContext";

function Layout() {
  const { toast } = useStore();

  return (
    <div className="page-shell">
      <Header />

      <main className="container main-content">
        <Outlet />
      </main>

      {toast && (
        <div
          key={toast.id}
          className={`toast-banner toast-banner--${toast.type}`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Layout;
