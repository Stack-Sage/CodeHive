'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function TeacherNavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-gray-800">
        {/* Logo / Brand */}
        <h1 className="text-xl md:text-2xl font-bold tracking-wide">
          Educator Dashboard
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 text-sm font-medium">
            <li className="hover:text-indigo-600 transition">
              <Link href="/profile">Profile</Link>
            </li>
            <li className="hover:text-indigo-600 transition">
              <Link href="/teacherChat/chat">Messages</Link>
            </li>
            <li className="hover:text-indigo-600 transition">
              <Link href="/teacher/settings">Settings</Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white text-gray-800 border-t border-gray-200 px-6 pb-4">
          <ul className="flex flex-col gap-4 text-base font-medium">
            <li className="hover:text-indigo-600 transition">
              <Link href="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            </li>
            <li className="hover:text-indigo-600 transition">
              <Link href="/teacherChat/chat" onClick={() => setMenuOpen(false)}>Messages</Link>
            </li>
            <li className="hover:text-indigo-600 transition">
              <Link href="/teacher/settings" onClick={() => setMenuOpen(false)}>Settings</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
