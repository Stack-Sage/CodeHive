'use client';
import React from "react";
import { FaUserGraduate, FaUserTie, FaFire } from "react-icons/fa";

const dummySiteStats = {
  totalStudents: 42,
  totalTeachers: 12,
  topSkills: [
    { skill: "Python", count: 8 },
    { skill: "React", count: 7 },
    { skill: "JavaScript", count: 6 },
    { skill: "Data Science", count: 5 },
    { skill: "Machine Learning", count: 4 },
    { skill: "CSS", count: 4 },
    { skill: "Node.js", count: 3 },
    { skill: "C++", count: 3 },
    { skill: "Java", count: 2 },
    { skill: "SQL", count: 2 },
  ],
};

export default function SiteStatsSidebar() {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-2">
        <FaUserGraduate className="text-blue-500" />
        <span className="font-bold text-blue-900">Students:</span>
        <span className="ml-1 text-black">{dummySiteStats.totalStudents}</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <FaUserTie className="text-pink-500" />
        <span className="font-bold text-pink-700">Teachers:</span>
        <span className="ml-1 text-black">{dummySiteStats.totalTeachers}</span>
      </div>
      <div className="mt-4">
        <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FaFire className="text-yellow-500" /> Top 10 Trending Skills
        </div>
        <ul className="text-sm text-gray-700">
          {dummySiteStats.topSkills.map((s, i) => (
            <li key={s.skill} className="flex justify-between">
              <span>{i + 1}. {s.skill}</span>
              <span className="font-bold text-blue-600">{s.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
