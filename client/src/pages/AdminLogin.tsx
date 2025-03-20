import { Button } from "@/components/ui/button";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Login Form Card */}
        <div className="w-full md:w-[45%] p-8 flex flex-col">
          <Button
            variant="ghost"
            className="mb-6 self-start"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>
          <div className="space-y-8 flex-grow">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Please sign in to your admin account
              </p>
            </div>
            <LoginForm />
          </div>
          <div className="mt-8 flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-gray-600 text-sm">
              This page is restricted to administrators only. If you are a user,
              please proceed to claim your coupon without logging in. Thank you
              for your understanding.
            </p>
          </div>
        </div>

        {/* Right side - Image Card with Gradient */}
        <div className="w-full md:w-[55%] relative h-[250px] md:h-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 mix-blend-multiply z-10" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center text-white max-w-md px-4">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              CouponsLoop Admin Dashboard
            </h2>
            <p className="text-sm md:text-base">
              Manage your application with our powerful admin tools
            </p>
          </div>
          <img
            src="https://fetchpik.com/images/fetchpik.com-fXsSjJvGQ3.jpg"
            alt="Admin Dashboard"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
