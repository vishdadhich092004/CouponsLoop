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
function App() {
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
