'use client'
import React, { useState } from 'react'
import { buttonStyle } from '@/ui/CustomCSS'
import { showError, showInfo, showSuccess } from '@/ui/toast'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '@/context/global.context'
import SendOtp from './SendOtp'
import { enterNewPasswordApi } from '@/services/user.service'

const ForgetPassword = ({ showModal, setShowModal, userEmail, onPasswordReset }) => {
  const [inputOtp, setInputOtp] = useState('')
  const [step, setStep] = useState('otp') 
  const [otpSent, setOtpSent] = useState(false)
  const { otp } = useGlobalContext()

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null
  // Use user.email for OTP and password reset

  const sendOtp = () => {
    if (!user?.email) {
      showError('No email found')
      return
    }
    setOtpSent(true)
  }

  const verifyOtp = () => {
    if (!inputOtp) {
      showError('Please enter the OTP')
      return
    }
    if (inputOtp === otp) {
      showSuccess('OTP verified successfully')
      setStep('reset') 
    } else {
      showError('Invalid OTP')
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    const newPass = e.target.password.value
    if (!newPass) {
      showError('Please enter a new password')
      return
    }
    if (newPass.length < 8) {
      showError('Password must be at least 8 characters long')
      return
    }
    
    const newPassword = await enterNewPasswordApi(newPass)

    if (!newPassword?.success) {
      showError(newPassword?.message || 'Failed to reset password')
      return
    }
    showSuccess('Password changed successfully!')
    setShowModal(false)

  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="relative flex flex-col gap-4 p-6 rounded-2xl bg-black/70 text-white shadow-xl w-96">
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
        >
          <FaTimes size={18} />
        </button>

        {step === 'otp' && (
          <>
            <h2 className="text-lg font-semibold text-center">Verify OTP</h2>

            {otpSent && <SendOtp userEmail={user?.email} />}

            <input
              value={inputOtp}
              onChange={(e) => setInputOtp(e.target.value)}
              type="text"
              className="w-full py-2 px-3 rounded-md outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:neutral-400"
              placeholder="Enter OTP"
              disabled={!otpSent}
            />

            {!otpSent ? (
              <button onClick={sendOtp} className={`${buttonStyle} w-full`}>
                Send OTP
              </button>
            ) : (
              <button onClick={verifyOtp} className={`${buttonStyle} w-full`}>
                Verify OTP
              </button>
            )}
          </>
        )}

        {step === 'reset' && (
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-center">Reset Password</h2>
            <input
              name="password"
              type="password"
              className="w-full py-2 px-3 rounded-md outline-none focus:ring-2 focus:ring-green-400 text-white placeholder:neutral-400"
              placeholder="Enter new password"
            />
            <button type="submit" className={`${buttonStyle} w-full`}>
              Set Password
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgetPassword
