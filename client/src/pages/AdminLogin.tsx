import { LoginForm } from "../components/LoginForm";

function AdminLogin() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="w-1/2 flex flex-col items-center justify-center px-8 bg-white">
        <div className="w-full max-w-md space-y-8 ">
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
      </div>

      {/* Right side - Image and Text */}
      <div className="w-1/2 h-screen bg-gray-100 relative">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-10 right-10 z-10 text-right max-w-md">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            CouponsLoop Admin Dashboard
          </h2>
          <p className="text-gray-700">
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
  );
}

export default AdminLogin;
