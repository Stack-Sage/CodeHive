'use client'

import { motion } from "framer-motion";

export default function Footer({ socialLinks = [], iconMap = {} }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full mx-4 backdrop-blur-xl text-gray-700 pt-8 md:pt-10 pb-4 md:pb-6 px-2 md:px-4 rounded-b-3xl shadow-xl
        bg-gradient-to-br from-blue-200/60 via-purple-200/40 to-pink-200/60 border-t border-blue-200/40"
      style={{
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
        background: "linear-gradient(120deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-6 items-start md:items-center">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            CodeHive
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            © {new Date().getFullYear()} CodeHive. All rights reserved.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-left w-full md:w-auto">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">About</h3>
            <a href="#about" className="hover:text-blue-500 transition">About CodeHive</a>
            <a href="#skills" className="hover:text-blue-500 transition">Skills</a>
            <a href="#team" className="hover:text-blue-500 transition">Contributors</a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Docs</h3>
            <a href="/docs/getting-started" className="hover:text-blue-500 transition">Getting Started</a>
            <a href="/docs/tutorials" className="hover:text-blue-500 transition">Tutorials</a>
            <a href="/docs/api" className="hover:text-blue-500 transition">API</a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Contributors</h3>
            <a href="https://github.com/owner" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">Project Owner</a>
            <a href="https://github.com/contributor" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">Main Contributor</a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {socialLinks.map((link) => (
                <a
                  key={link.icon}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/30 backdrop-blur-lg shadow hover:scale-110 transition-all hover:bg-gradient-to-r hover:from-blue-400 hover:to-pink-400"
                >
                  {iconMap[link.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
