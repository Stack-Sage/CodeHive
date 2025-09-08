'use client'


import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'


function ParticleBackground() {
      const canvasRef = useRef(null)


      useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      let particles = []


      const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      }))
      }
      resize()
      window.addEventListener('resize', resize)


      const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 20, 0.9)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)


      particles.forEach((p) => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0,200,255,0.8)'
      ctx.fill()


      p.x += p.dx
      p.y += p.dy


      if (p.x < 0 || p.x > canvas.width) p.dx *= -1
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })


      requestAnimationFrame(draw)
      }
      draw()


return () => window.removeEventListener('resize', resize)
}, [])


return <canvas ref={canvasRef} className="absolute inset-0" />
}


export default ParticleBackground