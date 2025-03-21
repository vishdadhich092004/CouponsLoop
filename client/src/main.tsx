import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CouponProvider } from "./contexts/CouponContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { initSession } from "@/api.clients";

const init = async () => {
  await initSession();
};
init();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <CouponProvider>
          <AdminAuthProvider>
            <App />
            <Toaster closeButton richColors duration={3000} />
          </AdminAuthProvider>
        </CouponProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
