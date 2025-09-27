"use client";
import React from "react";

export const SettingsPanel = ({ settings, handleToggle }) => {
  const items = [
    { key: "emailNotifications", label: "Email Notifications" },
    { key: "darkMode", label: "Dark Mode" },
    { key: "lightMode", label: "Light Mode" },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-lg shadow-xl rounded-3xl p-6 max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Settings</h2>

      {items.map((item) => (
        <div key={item.key} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-gray-700 font-medium">{item.label}</span>
          <button
            onClick={() => handleToggle(item.key)}
            className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${
              settings[item.key] ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                settings[item.key] ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
};
