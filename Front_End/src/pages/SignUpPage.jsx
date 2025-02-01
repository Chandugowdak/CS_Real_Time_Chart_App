import { useState } from "react";
import { useAuthStore } from "../store/UseAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false); //THIS IS TO MANAGE THE SHOW AND HIDE PASSWOERD
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    //THIS IS USED TO VALIDATE THE FORM
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1A1A2E] to-[#16213E] p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-xs p-6 space-y-6 bg-gray-900 shadow-xl sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl sm:p-8 md:p-10">
        {/* App Logo & Name */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-wide sm:text-4xl text-primary">
            Seni<span className="text-white">_Juni</span>_Chat_App
          </h1>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Your ultimate chat & networking experience!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="font-medium text-gray-300">Full Name</span>
            </label>
            <div className="relative">
              <User className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 size-5" />
              <input
                type="text"
                className="w-full pl-10 text-white transition-all duration-200 bg-gray-800 border-gray-700 input input-bordered focus:border-primary focus:ring-primary"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  // WE ARE USING THE SPREAD OPERATOR TO UPDATE THE FORM DATA BECAUSE IT IS OBJECT
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="font-medium text-gray-300">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 size-5" />
              <input
                type="email"
                className="w-full pl-10 text-white transition-all duration-200 bg-gray-800 border-gray-700 input input-bordered focus:border-primary focus:ring-primary"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="font-medium text-gray-300">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 size-5" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 text-white transition-all duration-200 bg-gray-800 border-gray-700 input input-bordered focus:border-primary focus:ring-primary"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 transition hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full transition-all duration-300 transform shadow-lg btn btn-primary hover:scale-105 hover:bg-primary-dark"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <div className="flex items-center gap-2">
                <Loader2 className="size-5 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-400 sm:text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
