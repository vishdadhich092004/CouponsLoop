import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { adminLogin } from "../api.clients";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Button } from "./ui/button";

interface LoginFormData {
  username: string;
  password: string;
}

export function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const loginFormData = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleAutofill = () => {
    loginFormData.setValue("username", "loopadmin");
    loginFormData.setValue("password", "admin@2025");
  };

  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginFormData) =>
      adminLogin(credentials.username, credentials.password),
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await queryClient.invalidateQueries({ queryKey: ["validate-admin"] });
      navigate("/admin/dashboard");
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginFormData.getValues());
  };

  return (
    <form className="space-y-6 w-full max-w-md" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleAutofill}
            className="text-sm"
          >
            Autofill Test Data
          </Button>
        </div>
        <div>
          <Label
            htmlFor="username"
            className="block text-sm font-medium text-black dark:text-gray-200"
          >
            Username
          </Label>
          <Input
            id="username"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:border-gray-600 dark:bg-black/50 dark:text-white"
            placeholder="Username"
            {...loginFormData.register("username")}
          />
        </div>

        <div>
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-black dark:text-gray-200"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:border-gray-600 dark:bg-black/50  dark:text-white"
              placeholder="Password"
              {...loginFormData.register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        variant="ghost"
        disabled={loginMutation.isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:bg-white dark:text-black bg-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </Button>

      {loginMutation.isError && (
        <p className="mt-2 text-sm text-red-600">
          Login failed. Please check your credentials and try again.
        </p>
      )}
    </form>
  );
}
