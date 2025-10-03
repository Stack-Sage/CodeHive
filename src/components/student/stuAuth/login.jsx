"use client";
import React, { useState } from "react";
import { loginStudentApi } from "@/services/student.service";
import LoadingHand from "@/components/auth/LoadingHand";
import { showError, showSuccess } from "@/ui/toast";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/global.context";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setStudentUser, setIsStuLogin } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await loginStudentApi({ email, password });
      showSuccess(" Logged in successfully!");

      console.log("Login response data:", response.data);


      console.log("user data:", response.data.user);

      setIsStuLogin("true");
      setStudentUser(response.data.user);

      localStorage.setItem("studentUser", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("isStuLogin", "true");
      
      router.push("/studentChat/stuProfile");

    } catch (err) {
   
      console.error("Login failed:", err.response?.data || err.message);
      console.log(err.response?.data)
      showError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 relative">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <LoadingHand />
        </div>
      )}

      <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30">
        <h2 className="text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6">
          Student Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields */}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full bg-white/40 border border-gray-200 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full bg-white/40 border border-gray-200 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="submit"
            value={loading ? "Logging in..." : "Login"}
            disabled={loading}
            className="w-full font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white py-3 rounded-xl shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
          />
        </form>


        <div className="flex justify-between mt-4 text-sm text-gray-700">
          <a href="/studentChat/auth/register/" className="text-blue-600 hover:underline">
            Don't have an account? Register
          </a>
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
