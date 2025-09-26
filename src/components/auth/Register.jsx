'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from './AuthForm';
import { registerUserApi } from '@/services/user.service';
import { showError, showSuccess } from '@/ui/toast';
import LoadingHand from './LoadingHand';

const registerFields = [
  { label: "fullname", type: "text", name: "fullname", placeholder: "Enter your full name", required: true },
  { label: "Email", type: "email", name: "email", placeholder: "Enter your email", required: true },
  { label: "Password", type: "password", name: "password", placeholder: "Enter your password", required: true },
  { label: "Contact", type: "tel", name: "contact", placeholder: "Enter your contact number", required: true },
  { label: "Price in ₹", type: "number", name: "price", placeholder: "Enter your Hourly Rate / Price in ₹", required: true },
];

export default function Register() {
  const [message, setMessage] = useState("Register");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      setSubmitted(true);
      setMessage("Creating Account!");
      const res = await registerUserApi(formData);
      setMessage("Registered Successfully");
      setSubmitted(false);
      showSuccess(res?.data.message || "Registered Successfully");
      console.log("Registration response:", res);
      router.push('/login');
    } catch (err) {
      showError(err?.response?.data?.message || "Failed");
      setMessage("Register");
    }
  };

  return (
    <main className = "flex min-h-screen flex-col items-center justify-between relative ">
    

    {
      submitted && <div className='absolute z-20 justify-center flex items-center min-h-screen  hue-rotate-180  '>

      <LoadingHand/>
      </div>
    }

    <AuthForm
      title="Register"
      fields={registerFields}
      buttonText={message}
      onSubmit={handleRegister}
      showBio
      showImageUpload
      agreementLink="/login"
      agreementText="Already have an account? Log In"
    />
  
    </main>

  );
}