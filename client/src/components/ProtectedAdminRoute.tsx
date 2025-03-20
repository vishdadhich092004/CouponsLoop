import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { toast } from "sonner";
import Cookies from "js-cookie";
interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const hasToken = Cookies.get("auth_token");

  // Add effect to show error message when authentication fails
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasToken) {
      toast.error("You must be logged in to access this page");
    }
  }, [isAuthenticated, isLoading, hasToken]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if neither authenticated nor has token
  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/admin/login" replace />;
  }

  // Render children if authenticated or has token
  return <>{children}</>;
}
