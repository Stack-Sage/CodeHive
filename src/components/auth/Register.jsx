'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from './AuthForm';
import { registerUserApi } from '@/services/user.service';
import { showError, showSuccess } from '@/ui/toast';
import LoadingHand from './LoadingHand';
import SendOtp from './SendOtp';
import { motion, AnimatePresence } from "framer-motion";

const requiredFields = [
  { label: "Full Name", type: "text", name: "fullname", placeholder: "Enter your full name", required: true },
  { label: "Email", type: "email", name: "email", placeholder: "Enter your email", required: true },
  { label: "Password", type: "password", name: "password", placeholder: "Enter your password", required: true },
];

const educatorOptionalFields = [
  { label: "Country", type: "text", name: "country", placeholder: "Country" },
  { label: "DOB", type: "date", name: "dob", placeholder: "Date of Birth" },
  { label: "Skills", type: "text", name: "skills", placeholder: "Skills (comma separated)" },
  { label: "Price in ₹", type: "number", name: "price", placeholder: "Hourly Rate / Price in ₹" },
];

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export default function Register() {
  const [role, setRole] = useState(""); // "" until chosen
  const [step, setStep] = useState(0); // start at step 0
  const [formData, setFormData] = useState({});
  const [emailInput, setEmailInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sentOtp, setSentOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [bioInput, setBioInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("Next");
  const router = useRouter();

  // Step 0: Role selection
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(1);
    showInfo(`Selected role: ${selectedRole === "student" ? "Student" : "Educator"}`);
  };

  // Step 1 handlers
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "email") setEmailInput(value);
  };

  const handleSendOtp = () => {
    if (!emailInput) {
      showError("Please enter your email first.");
      return;
    }
    setOtpSent(true);
  };

  const handleOtpSend = (otp) => {
    setSentOtp(otp);
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    const otpInput = formData.otp;
    if (!otpInput || otpInput.trim() === "") {
      showError("Please enter the OTP you received.");
      return;
    }
    if (otpInput === sentOtp) {
      setOtpVerified(true);
      setSentOtp("");
      showSuccess("Email verified!");
    } else {
      showError("Incorrect OTP. Please try again.");
    }
  };

  const handleStep1Next = (e) => {
    e.preventDefault();
    let missing = [];
    // Validate required fields
    requiredFields.forEach(f => {
      const val = formData[f.name];
      if (!val || val.trim() === "") missing.push(f.label);
    });
    if (!otpVerified) {
      showError("Please verify your email before proceeding.");
      return;
    }
    if (missing.length) {
      showError(`Please fill all required fields: ${missing.join(", ")}`);
      return;
    }
    // Use formData directly instead of FormData(e.target)
    let payload = {};
    requiredFields.forEach(f => payload[f.name] = formData[f.name]);
    payload.roles = [role];
    setFormData(payload);
    showSuccess("Step 1 completed. Proceeding to next step.");
    setStep(2);
  };

  // Step 2 handlers
  const handleAvatarChange = (file) => {
    setAvatarFile(file);
  };
  const handleBioChange = (e) => {
    setBioInput(e.target.value);
  };
  const handleStep2Next = (e) => {
    e.preventDefault();
    let missing = [];
    if (!avatarFile) missing.push("Avatar");
    if (!bioInput || bioInput.trim() === "") missing.push("Bio");
    if (missing.length) {
      showError(`Please fill all required fields: ${missing.join(", ")}`);
      return;
    }
    setFormData(prev => ({
      ...prev,
      avatar: avatarFile,
      bio: bioInput
    }));
    showSuccess("Step 2 completed. Proceeding to next step.");
    if (role === "educator") {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  // Step 3 handlers (educator only)
  const handleStep3Next = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let updatedFormData = { ...formData };
    let missing = [];
    educatorOptionalFields.forEach(f => {
      const val = data.get(f.name);
      if (!val || val.trim() === "") missing.push(f.label);
      updatedFormData[f.name] = val;
    });
    if (missing.length) {
      showError(`Please fill all required fields: ${missing.join(", ")}`);
      return;
    }
    setFormData(updatedFormData);
    showSuccess("Step 3 completed. Proceeding to final submission.");
    setStep(4);
  };

  // Step 4: Final submission
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    let payload = { ...formData };

    // Ensure skills is a string for backend, even if array
    if (Array.isArray(payload.skills)) {
      payload.skills = payload.skills.join(",");
    }
    // If skills is not set, set to empty string
    if (!payload.skills) {
      payload.skills = "";
    }
    // Ensure dob is a string (ISO) or empty string
    if (payload.dob instanceof Date) {
      payload.dob = payload.dob.toISOString();
    }
    if (!payload.dob) {
      payload.dob = "";
    }
    // Ensure price is a number or empty string
    if (payload.price === undefined || payload.price === null || payload.price === "") {
      payload.price = "";
    }
    // Ensure bio is a string
    if (!payload.bio) {
      payload.bio = "";
    }
    // Ensure country is a string
    if (!payload.country) {
      payload.country = "";
    }
    // Ensure avatar is handled as file or empty string
    if (!payload.avatar) {
      payload.avatar = "";
    }
    // Ensure roles is always an array of strings
    if (!payload.roles || !Array.isArray(payload.roles) || !payload.roles.length) {
      payload.roles = [role];
    }

    const submitData = new FormData();
    let hasData = false;
    Object.entries(payload).forEach(([key, value]) => {
      if (key === "avatar" && value instanceof File) {
        submitData.append("avatar", value);
        hasData = true;
      } else if (key === "roles" && Array.isArray(value)) {
        value.forEach(roleVal => submitData.append("roles[]", String(roleVal)));
        hasData = true;
      } else if (key === "skills") {
        submitData.append("skills", String(value));
        hasData = true;
      } else if (key === "price") {
        submitData.append("price", value === "" ? "" : Number(value));
        hasData = true;
      } else if (value !== undefined && value !== null) {
        submitData.append(key, String(value));
        hasData = true;
      }
    });

    if (!hasData) {
      showError("No registration data to submit.");
      return;
    }
    try {
      setSubmitted(true);
      setMessage("Registering...");
      const res = await registerUserApi(submitData);
      setMessage("Registered Successfully");
      setSubmitted(false);
      showSuccess(res?.message || `A New ${res.roles[0]} Registered Successfully `);
      router.push('/login');
    } catch (error) {
      showError(error?.response?.data?.message || "Failed");
      setMessage("Complete Registration");
      setSubmitted(false);
    }
  };

  // Back step handler
  const handleBack = () => {
    if (step === 1) setStep(0);
    else if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(role === "educator" ? 3 : 2);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center mx-4 relative">
      {submitted && (
        <div className='absolute z-20 justify-center flex items-center min-h-screen w-full bg-black/10'>
          <LoadingHand />
        </div>
      )}

      <div className="w-full max-w-lg px-4 py-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-white/30 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInVariant}
              className="w-full"
            >
              {/* Step 0: Role Selection */}
              <div className="w-full flex flex-col items-center space-y-6">
                <div className="text-center font-extrabold text-2xl mb-4">Choose your role to register</div>
                <div className="flex gap-6 justify-center">
                  <button
                    type="button"
                    className="px-8 py-4 rounded-xl font-bold bg-indigo-600 text-white"
                    onClick={() => handleRoleSelect("student")}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    className="px-8 py-4 rounded-xl font-bold bg-purple-600 text-white"
                    onClick={() => handleRoleSelect("educator")}
                  >
                    Educator
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInVariant}
              className="w-full"
            >
              {/* Step 1: Basic Info & Email Verification */}
              <form className="w-full space-y-4" onSubmit={handleStep1Next} encType="multipart/form-data">
                <div className="mb-6 flex justify-center gap-6">
                  <button
                    type="button"
                    className={`px-6 py-2 rounded-xl font-bold ${role === "student" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 border border-indigo-600"}`}
                    onClick={() => setRole("student")}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    className={`px-6 py-2 rounded-xl font-bold ${role === "educator" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 border border-indigo-600"}`}
                    onClick={() => setRole("educator")}
                  >
                    Educator
                  </button>
                </div>
                {/* Full Name */}
                <input
                  required
                  className="w-full bg-white/40 border border-gray-200 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="fullname"
                  placeholder="Enter your full name"
                  value={formData.fullname || ""}
                  onChange={handleFieldChange}
                />
                {/* Email + OTP */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <input
                      required
                      className="flex-1 bg-white/40 border border-gray-200 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={emailInput}
                      onChange={handleFieldChange}
                      disabled={otpVerified}
                    />
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white shadow-lg ${otpSent ? "opacity-60 cursor-not-allowed" : ""}`}
                      onClick={handleSendOtp}
                      disabled={otpSent || otpVerified}
                    >
                      Send OTP
                    </button>
                  </div>
                  {otpSent && !otpVerified && (
                    <>
                      <SendOtp userEmail={emailInput} onOtpSend={handleOtpSend} />
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          name="otp"
                          placeholder="Enter OTP"
                          className="flex-1 px-4 py-2 rounded-lg border"
                          required
                          value={formData.otp || ""}
                          onChange={e => setFormData(prev => ({ ...prev, otp: e.target.value }))}
                        />
                        <button
                          type="button"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold"
                          onClick={handleOtpVerify}
                        >
                          Verify Email
                        </button>
                      </div>
                    </>
                  )}
                  {otpVerified && (
                    <span className="text-green-600 font-semibold">Email verified!</span>
                  )}
                </div>
                {/* Password */}
                <input
                  required
                  className="w-full bg-white/40 border border-gray-200 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password || ""}
                  onChange={handleFieldChange}
                />
                <span className="block text-center mt-8 text-xs text-gray-700">
                  <a href="/login" className="hover:underline">
                    Already have an account? Log In
                  </a>
                </span>
                <div className="flex gap-2">
                  <input
                    className={`w-full font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white py-3 mt-4 rounded-xl shadow-lg hover:scale-[1.02] transition`}
                    type="submit"
                    value="Next"
                    disabled={!otpVerified}
                  />
                </div>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInVariant}
              className="w-full"
            >
              {/* Step 2: Avatar & Bio */}
              <form className="w-full space-y-4" onSubmit={handleStep2Next} encType="multipart/form-data">
                <AuthForm
                  title="Upload Avatar & Bio"
                  fields={[]} // 
                  buttonText=""
                  onSubmit={() => {}}
                  showBio={true}
                  showImageUpload={true}
                  avatarLabel="Add Avatar"
                  // Custom handlers for avatar and bio
                  onAvatarChange={handleAvatarChange}
                  onBioChange={handleBioChange}
                />
                <div className="flex gap-2">
                  <button type="button" onClick={handleBack} className="w-full px-6 py-3 bg-gray-200 text-indigo-600 rounded-xl font-bold">
                    Back
                  </button>
                  <input
                    className={`w-full font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white py-3 rounded-xl shadow-lg hover:scale-[1.02] transition`}
                    type="submit"
                    value={role === "educator" ? "Next" : "Complete Registration"}
                  />
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && role === "educator" && (
            <motion.div
              key="step3"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInVariant}
              className="w-full"
            >
              {/* Step 3: Educator Additional Details */}
              <form onSubmit={handleStep3Next} className="w-full flex flex-col gap-4">
                {educatorOptionalFields.map((f, i) => (
                  <input
                    key={i}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-2 rounded-lg border"
                  />
                ))}
                <div className="flex gap-2">
                  <button type="button" onClick={handleBack} className="w-full px-6 py-3 bg-gray-200 text-indigo-600 rounded-xl font-bold">
                    Back
                  </button>
                  <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">
                    Complete Registration
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInVariant}
              className="w-full"
            >
              {/* Step 4: Final Submission */}
              <form className="w-full" onSubmit={handleFinalSubmit}>
                <div className="text-center text-lg font-bold mb-6">Review & Submit</div>
                <button type="button" onClick={handleBack} className="w-full px-6 py-3 mb-4 bg-gray-200 text-indigo-600 rounded-xl font-bold">
                  Back
                </button>
                <input
                  className={`w-full font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white py-3 rounded-xl shadow-lg hover:scale-[1.02] transition`}
                  type="submit"
                  value="Submit Registration"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}