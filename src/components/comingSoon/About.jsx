'use client'

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { motion } from "framer-motion";

export default function About() {
  const skills = [

    { id: 1, icon: "💻", title: "Coding", colorFrom: "from-pink-200/30", colorTo: "to-purple-300", description: "Master coding skills 1v1.", tooltip: "Learn to code!" },

    { id: 2, icon: "🎨", title: "Art", colorFrom: "from-blue-200/40", colorTo: "to-indigo-300", description: "Improve your creativity.", tooltip: "Master your art skills!" },

    { id: 3, icon: "♟️", title: "Chess", colorFrom: "from-green-200/30", colorTo: "to-pink-300/20", description: "Sharpen your strategy.", tooltip: "Sharpen your chess!" },

    { id: 4, icon: "🎵", title: "Music", colorFrom: "from-yellow-200/30", colorTo: "to-orange-300/20", description: "Learn instruments & compose.", tooltip: "Play and compose!" },

    { id: 5, icon: "🖋️", title: "Calligraphy", colorFrom: "from-purple-200/40", colorTo: "to-pink-300/20", description: "Write beautifully.", tooltip: "Master calligraphy!" },

    { id: 6, icon: "🏀", title: "Sports", colorFrom: "from-green-200/30", colorTo: "to-blue-300/30", description: "Improve your skills.", tooltip: "Train your sports!" }


  ];

  const repeatedSkills = [...skills, ...skills, ...skills]; 

  return (

    <section className="max-w-7xl mx-auto text-center lg:mb-32 px-6 relative overflow-hidden">
      
    
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 drop-shadow-lg"
      >
        About <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600">CodeHive</span>
      </motion.h3>

    
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="text-gray-700 text-md mx-10 lg:mx-auto md:text-base lg:text-lg leading-relaxed lg:mb-16 md:mb-10 mb-4 max-w-4xl "
      >
        We believe every skill has value  from <span className="font-semibold">coding</span> to <span className="font-semibold">chess</span>, <span className="font-semibold">art</span> to <span className="font-semibold">music</span>. <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600">CodeHive</span> empowers you to showcase your talents and connect with learners in engaging 1v1 sessions.
      </motion.p>

  
      <div className="w-[90vw]  overflow-hidden lg:w-[50vw] mx-auto items-center justify-center  ">
        
        <motion.div
          className="flex gap-4 md:gap-6 lg:gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        >
          {repeatedSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              data-tooltip-id={`tooltip-${skill.id}-${idx}`}
              whileHover={{ y: -4, scale: 1.05, boxShadow: "0 10px 30px rgba(59,130,246,0.4)" }}
              className={`inline-flex flex-col items-center justify-center min-w-[160px]  sm:min-w-[180px] md:min-w-[200px] max-w-[220px] h-24 md:h-44 lg:h-48  bg-gradient-to-br ${skill.colorFrom} via-white/30 ${skill.colorTo} shadow-lg rounded-2xl
                          cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-rose-400 px-3 py-3`}
            >
              <span className="text-3xl sm:text-4xl md:text-5xl mb-1">{skill.icon}</span>
              <span className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">{skill.title}</span>
              <p className="mt-1 text-xs sm:text-sm md:text-sm text-gray-700 px-1">{skill.description}</p>
              <Tooltip id={`tooltip-${skill.id}-${idx}`} content={skill.tooltip} place="top" />
            </motion.div>
          ))}
        </motion.div>
      </div>

  
      <div className="absolute top-0 left-1/4 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-pink-400 opacity-50 blur-3xl animate-blob"></div>
    
      <div className="absolute top-1/3 right-1/4 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-rose-400 opacity-30 blur-3xl animate-blob animation-delay-2000"></div>

      <div className="absolute bottom-0 left-1/3 w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-purple-400 opacity-50 blur-3xl animate-blob animation-delay-4000"></div>
      
    </section>
  );
}
