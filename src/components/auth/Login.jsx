"use client";
import { showError, showSuccess } from "@/ui/toast";
import AuthForm from "./AuthForm";
import React, { useContext,useState } from "react";
import { loginUserApi } from "@/services/user.service";
import { useRouter } from "next/navigation";
import GlobalProvider, { useGlobalContext } from "@/context/global.context";
import LoadingHand from "./LoadingHand";
import { buttonStyleTwo } from "@/ui/CustomCSS";
import { FaLock, FaLockOpen, FaUserLock } from "react-icons/fa";
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
      contact: isPhone ? identifier : "",
      password,
    };

    setLogin("Logging in...");
    setSubmitted(true);
    
    try {
      const response = await loginUserApi(payload);
      if(response.success){

        setLogin("Login successfull");
        showSuccess(response.message || "Login Successful");
      
        const { accessToken, refreshToken, user } = response.data;
    
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setSubmitted(false);
        setIsLogin(true);
      }
      router.push("/profile");
      

    } catch (error) {
      setIsLogin(false);
      setSubmitted(false);
      setLogin("Login");
      console.error("Login failed:", error.response?.data || error.message);
      showError(error.response?.data?.message || "Login failed");
    }
  };

  return (


    <main className = "flex h-screen flex-col items-center justify-between relative ">
    

    {
      submitted && <div className='absolute z-20 justify-center flex items-center min-h-screen  hue-rotate-180  '>

      <LoadingHand/>
      </div>
    }

    

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
        className={` w-fit px-6 py-4 h-fit absolute top-[500px] text-black rounded-xl flex items-center justify-center gap-3  cursor-pointer hover:scale-105 transition-all duration-300 font-semibold`}
      >
        <FaUserLock /> Forgot Password
      </button> 

        {showForget && <ForgetPassword showModal={showForget} setShowModal={setShowForget} />}

    </main>

  );
};

export default Login;
