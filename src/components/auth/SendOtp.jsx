'use client'
import { useState, useEffect, useRef } from 'react'
import { useGlobalContext } from '@/context/global.context'
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

export default function SendOtp({ userEmail }) {
  const { setOtp } = useGlobalContext()
  const [status, setStatus] = useState('')
  const sentRef = useRef(false) // 🚀 guard

  useEffect(() => {
    if (!userEmail || sentRef.current) return
    sentRef.current = true // ensure only one send

    const newOtp = generateNumericOtp()
    setOtp(newOtp)
    setStatus('Sending...')
    sendOtpEmail(userEmail, newOtp)
      .then(() => setStatus('✅ OTP sent to your email'))
      .catch(() => setStatus('❌ Failed to send OTP'))
  }, [userEmail, setOtp])

  return <div className="mt-2 text-sm">{status}</div>
}
