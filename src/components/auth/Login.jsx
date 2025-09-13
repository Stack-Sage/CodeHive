"use client";
import { showError, showSuccess } from "@/ui/toast";
import AuthForm from "./AuthForm";
import React, { useContext,useState } from "react";
import { loginUserApi } from "@/services/user.service";
import { useRouter } from "next/navigation";
import GlobalProvider, { useGlobalContext } from "@/context/global.context";

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

  const [login, setLogin] = useState();

  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const identifier = formData.get("identifier")?.trim();
    const password = formData.get("password");

    // Validate identifier
    const isEmail = /\S+@\S+\.\S+/.test(identifier);
    const isPhone = /^\d{10}$/.test(identifier); 

    if (!isEmail && !isPhone) {
      showError("Please enter a valid email or 10-digit phone number.");
      return;
    }

 
    const payload = {
      email: isEmail ? identifier : "",
      contact: isPhone ? identifier : "",
      password,
    };

    setLogin("Logging in...");
    
    try {
      const response = await loginUserApi(payload);
      if(response.success){

        setLogin("Login successfull");
        showSuccess(response.message || "Login Successful");
      
        const { accessToken, refreshToken, user } = response.data;
    
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsLogin(true);
      }
      router.push("/student");
      

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      showError("Login failed. Please check your credentials.");
    }
  };

  return (
    <AuthForm
      title="Login"
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
  );
};

export default Login;
