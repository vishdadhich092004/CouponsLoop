import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { validateAdmin } from "../api.clients";

type Admin = {
  username: string;
  userId: string;
};

type AdminAuthContextType = {
  admin: Admin | null;
  isAuthenticated: boolean;
  refetchUser: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within a AdminAuthProvider");
  }
  return context;
};

type AdminAuthProviderProps = {
  children: React.ReactNode;
};

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const { data, refetch } = useQuery({
    queryKey: ["validate-admin"],
    queryFn: validateAdmin,
    retry: false,
  });
  const user = data?.admin;
  const isAuthenticated = Boolean(user);

  return (
    <AdminAuthContext.Provider
      value={{ admin: user, isAuthenticated, refetchUser: refetch }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
