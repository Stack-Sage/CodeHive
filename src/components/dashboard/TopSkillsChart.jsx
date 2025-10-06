'use client';
import React from "react";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const skillsData = {
  labels: ["Python", "React", "JavaScript", "Data Science", "Machine Learning", "CSS", "Node.js", "C++", "Java", "SQL"],
  datasets: [
    {
      data: [8, 7, 6, 5, 4, 4, 3, 3, 2, 2],
      backgroundColor: [
        "rgba(59,130,246,0.7)",
        "rgba(236,72,153,0.7)",
        "rgba(34,197,94,0.7)",
        "rgba(139,92,246,0.7)",
        "rgba(251,191,36,0.7)",
        "rgba(16,185,129,0.7)",
        "rgba(239,68,68,0.7)",
        "rgba(59,130,246,0.5)",
        "rgba(236,72,153,0.5)",
        "rgba(34,197,94,0.5)",
      ],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

export default function TopSkillsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-blue-100/60 via-pink-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center mb-6"
    >
      <div className="font-semibold text-lg text-blue-900 mb-2">Top 10 Skills</div>
      <div className="h-48 w-full flex items-center justify-center">
        <Pie data={skillsData} options={{
          plugins: { legend: { position: "bottom" } },
          responsive: true,
          maintainAspectRatio: false,
        }} />
      </div>
    </motion.div>
  );
}
