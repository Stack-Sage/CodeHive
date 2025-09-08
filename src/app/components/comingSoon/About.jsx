'use client'

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="max-w-6xl mx-auto text-center mb-32 px-6 relative">
      

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 drop-shadow-lg"
      >
        About <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600">CodeHive</span>
      </motion.h3>

      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="text-gray-700 text-lg md:text-xl leading-relaxed mb-16 max-w-4xl mx-auto"
      >
        We believe every skill has value — from <span className="font-semibold text-gradient">coding</span> to <span className="font-semibold text-gradient">cooking</span>, <span className="font-semibold text-gradient">chess</span> to <span className="font-semibold text-gradient">calligraphy</span>. 
        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600">
          {" "}CodeHive{" "}
        </span>
        empowers you to showcase your talents, connect with learners, and offer 1v1 sessions. Every session is an opportunity to learn, grow, and share knowledge in a visually engaging, modern environment.
      </motion.p>

    
      <div className="flex flex-wrap justify-center gap-10">
        {[
          {
            id: 1,
            icon: "💻",
            title: "Coding",
            colorFrom: "from-pink-200",
            colorTo: "to-purple-300", 
            description: "Learn, teach, and master coding skills through interactive 1v1 sessions.",
            tooltip: "Learn to code with experts!"
          },
          {
            id: 2,
            icon: "🎨",
            title: "Art",
              colorFrom: "from-blue-200",
            colorTo: "to-indigo-300",
            description: "Explore your creativity, learn new techniques, and get feedback from experienced artists.",
            tooltip: "Master your artistic skills!"
          },
          {
            id: 3,
            icon: "♟️",
            title: "Chess",
            colorFrom: "from-green-200",
            colorTo: "to-pink-300",
            description: "Sharpen your strategy and challenge others in 1v1 chess sessions to improve your game.",
            tooltip: "Sharpen your chess strategy!"
          }
        ].map(skill => (
          <motion.div
            key={skill.id}
            data-tooltip-id={`tooltip-${skill.id}`}
            whileHover={{ y: -6, boxShadow: "0 0 40px rgba(59,130,246,0.5)" }}
            className={`relative w-48 h-48 md:w-56 md:h-56 flex flex-col items-center justify-center rounded-3xl
                        bg-gradient-to-br ${skill.colorFrom} via-white ${skill.colorTo} shadow-lg cursor-pointer transition-all duration-300 hover:hue-rotate-30 hover:ring-1 hover:ring-rose-500 `}
          >
            <span className="text-5xl mb-2  ">{skill.icon}</span>
            <span className="font-semibold  text-gray-900 text-lg">{skill.title}</span>
            <p className="mt-2 text-sm text-gray-700 px-3">{skill.description}</p>
            <Tooltip id={`tooltip-${skill.id}`} content={skill.tooltip} place="top" />
          </motion.div>
        ))}
      </div>

  
      <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-pink-400 opacity-50 blur-3xl animate-blob"> </div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-rose-400 opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-36 h-36 rounded-full bg-purple-400 opacity-50 blur-3xl animate-blob animation-delay-4000"></div>
    </section>
  );
}
