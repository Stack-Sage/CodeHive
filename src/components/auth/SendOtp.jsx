'use client'
import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

function generateNumericOtp(length = 6) {
  let otp = ''
  for (let i = 0; i < length; i++) otp += Math.floor(Math.random() * 10)
  return otp
}

function sendOtpEmail(toEmail, otp) {
  return emailjs.send(
    'service_nfq1gql',
    'template_yzukbeh',
    { email: toEmail, otp, owner_email: 'official.adirajpu@gmail.com' },
    'Yt7duJ8PkQlj2j1w7'
  )
}

export default function SendOtp({ userEmail, onOtpSend }) {
  const [status, setStatus] = useState('')
  const sentRef = useRef({ email: null, sent: false })

  useEffect(() => {
    if (!userEmail) return
    // Only send OTP if email changes or not sent yet
    if (sentRef.current.email !== userEmail || !sentRef.current.sent) {
      const newOtp = generateNumericOtp()
      sentRef.current = { email: userEmail, sent: true }
      if (onOtpSend) onOtpSend(newOtp)
      setStatus('Sending...')
      sendOtpEmail(userEmail, newOtp)
        .then(() => setStatus('✅ OTP sent to your email'))
        .catch(() => setStatus('❌ Failed to send OTP'))
    }
  }, [userEmail, onOtpSend])

  return <div className="mt-2 text-sm">{status}</div>
}
