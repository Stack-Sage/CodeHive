'use client'

import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaBook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" relative  lg:h-[26vh]  w-full  backdrop-blur-xl text-gray-700 pt-10  pb-6 lg:px-6 px-3">
      
     
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600 opacity-50 animate-gradient" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between lg:gap-10 gap-2 md:gap-4 items-start md:items-center">
        
        <div className="flex flex-col items-start md:items-start gap-2">
          <h2 className="text-xl font-bold text-transparent bg-clip-text  bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-gradient">
            CodeHive
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            © {new Date().getFullYear()} CodeHive. All rights reserved.
          </p>
        </div>

   
        <div className="grid  grid-cols-4 lg:gap-6 gap-2 text-left">
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
            <div className="flex flex-wrap gap-3 mt-1">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/20 hover:bg-gradient-to-r from-gray-800 to-black hover:scale-110 transition shadow-lg">
                <FaGithub className="text-2xl text-gray-800 dark:text-gray-200" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/20 hover:bg-gradient-to-r from-sky-400 to-blue-600 hover:scale-110 transition shadow-lg">
                <FaTwitter className="text-2xl text-sky-500" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/20 hover:bg-gradient-to-r from-blue-500 to-indigo-700 hover:scale-110 transition shadow-lg">
                <FaLinkedin className="text-2xl text-blue-600" />
              </a>
              <a href="mailto:hello@codehive.com" className="p-2 rounded-full bg-white/20 hover:bg-gradient-to-r from-green-400 to-green-600 hover:scale-110 transition shadow-lg">
                <FaEnvelope className="text-2xl text-green-600" />
              </a>
            </div>
          </div>
        </div>
      </div>

      
      <div className="absolute top-0 left-1/4 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-pink-400 opacity-40 blur-3xl animate-blob"></div>
      <div className="absolute bottom-10 right-1/4 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-purple-400 opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-5 left-1/3 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-blue-400 opacity-50 blur-3xl animate-blob animation-delay-4000"></div>

    </footer>
  );
}
