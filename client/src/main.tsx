import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CouponProvider } from "./contexts/CouponContext";
import { initSession } from "./api.clients.ts";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
// Add initialization function
const initializeApp = async () => {
  if (!sessionStorage.getItem("session")) {
    await initSession();
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
      <QueryClientProvider client={queryClient}>
        <CouponProvider>
          <AdminAuthProvider>
            <App />
          </AdminAuthProvider>
        </CouponProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});
