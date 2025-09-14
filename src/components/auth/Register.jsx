'use client'
import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from './AuthForm';
import { registerUserApi } from '@/services/user.service';
import { showError, showSuccess } from '@/ui/toast';


const registerFields = [
  { label: "fullname", type: "text", name: "fullname", placeholder: "Enter your full name", required: true },
  { label: "Email", type: "email", name: "email", placeholder: "Enter your email", required: true },
  { label: "Password", type: "password", name: "password", placeholder: "Enter your password", required: true },
  { label: "Contact", type: "tel", name: "contact", placeholder: "Enter your contact number", required: true },
  { label: "Price", type: "number", name: "price", placeholder: "Enter your Hourly Rate / Price", required: true },
];


const Register = () => {
const [message ,setMessage] = useState("Register")


  const router = useRouter()
  const handleRegister = async(e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      setMessage("Creating Account!")
      const response = await registerUserApi(formData);


      if(response){
        console.log("data is ",response)
        setMessage("Registered Successfully")
        showSuccess(response.message)
        
        router.push('/login')
        showSuccess(response.message || "Registered Successfully")

      }
      else{
        
      }
    } catch (error) {
      
      showError(error?.response?.data?.message || "Failed")
     
    }
  }

  return (
    <AuthForm
      title="Register"
      fields={registerFields}
      buttonText={message}
      showSocial={false}
      onSubmit={handleRegister}
      showBio={true}
      showImageUpload={true}
      agreementLink="/login"
      agreementText="Already have an account? Log In"
    />
  );
};

export default Register;