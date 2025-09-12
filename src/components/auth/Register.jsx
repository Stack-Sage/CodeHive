'use client'
import { register } from "next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup";
import AuthForm from "./AuthForm";

import React from 'react'

const registerFilds = [
  { label: "Name", type: "text", name: "name", placeholder: "Enter your full name", required: true },
  { label: "Email", type: "email", name: "email", placeholder: "Enter your email", required: true },  
   { label: "Password", type: "password", name: "password", placeholder: "Enter your password", required: true },
   { label: "Contact", type: "number", name: "contact", placeholder: "Enter your contact number", required: true },
  { label: "Bio", type: "textarea", name: "bio", placeholder: "Enter your bio", required: true }
];

const Register = () => {
   const handleRegister = (e) => {
    e.preventDefault();
   
  }

  return (
     <AuthForm
      title="Register"
      fields={registerFilds}
      buttonText="Register"
      showSocial = {false}
      onSubmit={handleRegister}
      showBio={true}
      showImageUpload={true}
      agreementLink="/login"
      agreementText="Already have an account? Log In"
    />
  )
}

export default Register