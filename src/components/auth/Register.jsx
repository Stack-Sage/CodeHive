'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from './AuthForm';
import { registerUserApi } from '@/services/user.service';
import { showError, showSuccess } from '@/ui/toast';
import LoadingHand from './LoadingHand';
import SendOtp from './SendOtp';

const requiredFields = [
  { label: "Full Name", type: "text", name: "fullname", placeholder: "Enter your full name", required: true },
  { label: "Email", type: "email", name: "email", placeholder: "Enter your email", required: true },
  { label: "Password", type: "password", name: "password", placeholder: "Enter your password", required: true },
  
];

const teacherOptionalFields = [
  { label: "Country", type: "text", name: "country", placeholder: "Country" },
  { label: "Bio", type: "text", name: "bio", placeholder: "Bio" },
  { label: "DOB", type: "date", name: "dob", placeholder: "Date of Birth" },
  { label: "Skills", type: "text", name: "skills", placeholder: "Skills (comma separated)" },
  { label: "Price in ₹", type: "number", name: "price", placeholder: "Hourly Rate / Price in ₹" },
];

export default function Register() {
  const [role, setRole] = useState("student");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("Register");
  const router = useRouter();

  // Step 1: Role selection and required fields
  const handleFirstStep = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let payload = {};
    requiredFields.forEach(f => payload[f.name] = data.get(f.name));
    payload.roles = [role === "teacher" ? "educator" : "student"];
    setFormData(payload);

    setOtpSent(true);
    setStep(2);
  };

  // Step 2: OTP verification
  const handleOtpVerify = async (otpInput) => {
    setOtpVerified(true);
    if (role === "teacher") {
      setStep(3);
    } else {
      handleFinalSubmit();
    }
  };

  // Step 3: Teacher optional details
  const handleTeacherDetails = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    teacherOptionalFields.forEach(f => {
      if (data.get(f.name)) formData[f.name] = data.get(f.name);
    });
    handleFinalSubmit();
  };

  // Final submit after OTP verification (and teacher details if applicable)
  const handleFinalSubmit = async () => {
    try {
      setSubmitted(true);
      setMessage("Registering...");
      const res = await registerUserApi(formData);
      setMessage("Registered Successfully");
      setSubmitted(false);
      showSuccess(res?.message || "Registered Successfully");
      router.push('/login');
    } catch (error) {
      showError(error?.response?.data?.message || "Failed");
      setMessage("Register");
      setSubmitted(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center mx-4 relative">
      {submitted && (
        <div className='absolute z-20 justify-center flex items-center min-h-screen w-full bg-black/10'>
          <LoadingHand />
        </div>
      )}

      <div className="w-full max-w-lg px-4 py-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-white/30 flex flex-col items-center">
        {step === 1 && (
          <div className="w-full">
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
              title={`Register as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
              fields={requiredFields}
              buttonText={message}
              onSubmit={handleFirstStep}
              showBio={false}
              showImageUpload={true}
              agreementLink="/login"
              agreementText="Already have an account? Log In"
            />
          </div>
        )}

        {step === 2 && otpSent && (
          <div className="w-full">
            <SendOtp userEmail={formData.email} />
            <form
              onSubmit={e => {
                e.preventDefault();
                handleOtpVerify(e.target.otp.value);
              }}
              className="mt-6 flex flex-col gap-4"
            >
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="w-full px-4 py-2 rounded-lg border"
                required
              />
              <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">
                Verify OTP
              </button>
            </form>
          </div>
        )}

        {step === 3 && role === "teacher" && otpVerified && (
          <form onSubmit={handleTeacherDetails} className="w-full flex flex-col gap-4">
            {teacherOptionalFields.map((f, i) => (
              <input
                key={i}
                type={f.type}
                name={f.name}
                placeholder={f.placeholder}
                className="w-full px-4 py-2 rounded-lg border"
              />
            ))}
            <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">
              Complete Registration
            </button>
          </form>
        )}
      </div>
    </main>
  );
}