import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CouponProvider } from "./contexts/CouponContext";
import { initSession } from "./api.clients.ts";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const initializeApp = async () => {
  try {
    if (!sessionStorage.getItem("session")) {
      await initSession();
    }
  } catch (error) {
    console.error("Failed to initialize session:", error);
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

// Call initialization before rendering
initializeApp().then(() => {
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
});
