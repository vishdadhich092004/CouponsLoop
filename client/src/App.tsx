import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import CouponsPage from "./pages/CouponsPage";
import CouponDetailsPage from "./pages/CouponsDetailsPage";
import ClaimHistoryPage from "./pages/ClaimHistoryPage";
import AdminLayout from "./layouts/AdminLayout";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";
import UserLayout from "./layouts/UserLayout";
import { useEffect, useState } from "react";
import { initSession } from "./api.clients";

function App() {
  const [isSessionInitialized, setIsSessionInitialized] = useState(false);
  const [sessionError, setSessionError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        await initSession();
        setIsSessionInitialized(true);
      } catch (error) {
        console.error("Session initialization failed:", error);
        setSessionError(error as Error);
      }
    };

    initializeSession();

    // Optional: Set up periodic session refresh
    const refreshInterval = setInterval(initializeSession, 15 * 60 * 1000); // every 15 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  if (sessionError) {
    return <div>Failed to initialize session. Please refresh the page.</div>;
  }

  if (!isSessionInitialized) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UserLayout>
              <HomePage />
            </UserLayout>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/coupons"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <CouponsPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/coupons/:id"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <CouponDetailsPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/claim-history"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <ClaimHistoryPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
