"use client";
import { showError, showSuccess } from "@/ui/toast";
import AuthForm from "./AuthForm";
import React, { useState } from "react";
import { loginUserApi } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/global.context";
import LoadingHand from "./LoadingHand";
import { FaUserLock } from "react-icons/fa";
import ForgetPassword from "./ForgetPassword";

const loginFields = [
  { 
    label: "Email or Contact", 
    type: "text", 
    name: "identifier", 
    placeholder: "Enter your email or contact number", 
    required: true 
  },
  { 
    label: "Password", 
    type: "password", 
    name: "password", 
    placeholder: "Enter your password", 
    required: true 
  },
];

const Login = () => {
  const { setUser, user, isLogin, setIsLogin } = useGlobalContext();
  const [submitted, setSubmitted] = useState(false);
  const [showForget, setShowForget] = useState(false);
  const [login, setLogin] = useState();
  const [role, setRole] = useState("student"); 

  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const identifier = formData.get("identifier")?.trim();
    const password = formData.get("password");

    const isEmail = /\S+@\S+\.\S+/.test(identifier);
    const isPhone = /^\d{10}$/.test(identifier); 

    if (!isEmail && !isPhone) {
      showError("Please enter a valid email or 10-digit phone number.");
      return;
    }

    const payload = {
      email: isEmail ? identifier : "",
      password,
      role: role === "teacher" ? "educator" : "student", 
    };

    setLogin("Logging in...");
    setSubmitted(true);
    
    try {
      const response = await loginUserApi(payload);
      if(response.success){
        setLogin("Login successfull");
        
        showSuccess(response.message || "Login Successful");
        const { user } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setSubmitted(false);
        setIsLogin(true);
        // Redirect based on role
        if (role === "teacher") {
          router.push("/dashboard");
        } else {
          router.push("/listing");
        }
      }
    } catch (error) {
      setIsLogin(false);
      setSubmitted(false);
      setLogin("Login");
      showError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center mx-4 justify-center bg-gradient-to-br relative">
      {submitted && (
        <div className='absolute z-20 justify-center flex items-center min-h-screen w-full bg-black/10'>
          <LoadingHand />
        </div>
      )}

      <div className="w-full max-w-lg px-4 py-8 rounded-3xl shadow-2xl hover:shadow-black/40 bg-white/80 backdrop-blur-lg border border-white/30 flex flex-col items-center">
        {/* Role selector */}
        <div className="mb-6 flex justify-center gap-6">
          <button
            className={`px-6 py-2 rounded-xl font-bold ${role === "student" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 border border-indigo-600"}`}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            className={`px-6 py-2 rounded-xl font-bold ${role === "teacher" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 border border-indigo-600"}`}
            onClick={() => setRole("teacher")}
          >
            Teacher
          </button>
        </div>
        <AuthForm
          title={login ? login : "Login to your account"}
          fields={loginFields}
          buttonText={login}
          showSocial={false}
          onSubmit={handleLogin}
          showBio={false}
          forgotPassword={true}
          showImageUpload={false}
          agreementLink="/register"
          agreementText="Don't have an account? Register"
        />

        <button
          onClick={() => setShowForget(!showForget)}
          className="w-fit px-6 py-4 mt-6 text-black rounded-xl flex items-center justify-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300 font-semibold"
        >
          <FaUserLock /> Forgot Password
        </button>

        {showForget && <ForgetPassword showModal={showForget} setShowModal={setShowForget} />}
      </div>
    </main>
  );
};

export default Login;
