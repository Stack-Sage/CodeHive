'use client';
import React from "react";
import { FaUserGraduate, FaUserTie, FaFire } from "react-icons/fa";
import useSWR from "swr";
import { getSiteStatsApi } from "@/services/dashboard.service";

export default function SiteStatsSidebar() {
  const { data: siteStats, error } = useSWR("siteStats", getSiteStatsApi);

  if (error) return <div className="p-6 text-red-600">Error loading site stats</div>;
  if (!siteStats) return <div className="p-6 text-blue-600">Loading site stats...</div>;

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-2">
        <FaUserGraduate className="text-blue-500" />
        <span className="font-bold text-blue-900">Students:</span>
        <span className="ml-1 text-black">{siteStats.totalStudents}</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <FaUserTie className="text-pink-500" />
        <span className="font-bold text-pink-700">Teachers:</span>
        <span className="ml-1 text-black">{siteStats.totalTeachers}</span>
      </div>
      <div className="mt-4">
        <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FaFire className="text-yellow-500" /> Top 10 Trending Skills
        </div>
        <ul className="text-sm text-gray-700">
          {siteStats.topSkills.map((s, i) => (
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
