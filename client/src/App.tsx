import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import CouponsPage from "./pages/CouponsPage";
import CouponDetailsPage from "./pages/CouponsDetailsPage";
import ClaimHistoryPage from "./pages/ClaimHistoryPage";
import AdminLayout from "./layouts/AdminLayout";
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
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/coupons"
          element={
            <AdminLayout>
              <CouponsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/coupons/:id"
          element={
            <AdminLayout>
              <CouponDetailsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/claim-history"
          element={
            <AdminLayout>
              <ClaimHistoryPage />
            </AdminLayout>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
