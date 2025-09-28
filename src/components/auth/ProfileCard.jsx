"use client";
import React from "react";
import { FaEdit } from "react-icons/fa";

export const EditableField = ({
  label,
  name,
  value,
  editingField,
  onChange,
  onSave,
  onEdit,
}) => (
  <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
    <span className="font-medium min-w-[110px] text-gray-800 dark:text-gray-300">
      {label}
    </span>
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        readOnly={editingField !== name}
        className={`w-full md:w-auto bg-white/40 dark:bg-gray-400/20 backdrop-blur-md outline-none border-none font-semibold rounded-lg px-4 py-2 text-sm transition-all duration-200 ease-in shadow-sm ${
          editingField !== name
            ? "cursor-default text-gray-600 dark:text-gray-400"
            : "text-gray-900 dark:text-gray-100 ring-2 ring-indigo-400/50"
        }`}
      />
      {editingField === name ? (
        <button
          onClick={() => onSave(name)}
          className="text-green-700 dark:text-green-400 hover:text-green-900 font-semibold px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/40 hover:bg-green-200 dark:hover:bg-green-800/60 transition"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => onEdit(name)}
          className="p-3 rounded-full bg-white/80 dark:bg-gray-800/60 text-indigo-700 dark:text-indigo-300 shadow-md hover:bg-indigo-50 dark:hover:bg-indigo-700/40 transition-transform transform hover:scale-110 duration-300"
        >
          <FaEdit />
        </button>
      )}
    </div>
  </div>
);



export const ProfileCard = ({
  user,
  editingField,
  formValues,
  setEditingField,
  handleChange,
  handleSave,
  handleAvatarChange,
  avatarPreview,
}) => {
  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "—";

  return (
    <div className="relative bg-gradient-to-br from-white/40 to-indigo-50/40 dark:from-gray-900/60 dark:to-gray-800/40 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden p-10 flex flex-col md:flex-row gap-10 items-center md:items-start border border-white/20 dark:border-gray-700 min-h-[70vh]">
      {/* Glowing background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-300/20 via-purple-200/20 to-pink-200/20 blur-3xl animate-pulse"></div>

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-indigo-500 blur-2xl opacity-30 animate-pulse"></div>
        <img
          src={avatarPreview || user.avatar || "/default-avatar.png"}
          alt={user.fullname || "User"}
          className="relative w-44 h-44 md:w-52 md:h-52 rounded-full object-cover shadow-xl ring-4 ring-gray-400/60"
        />

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              handleAvatarChange(e.target.files[0]);
            }
          }}
          className="absolute bottom-0 right-0 w-12 h-12 opacity-0 cursor-pointer"
        />

        {/* Edit button triggers file dialog */}
        <button
          className="absolute bottom-3 right-3 bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-110"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          <FaEdit />
        </button>
      </div>

      {/* User Info */}
      <div className="flex-1 flex flex-col gap-8">
        <EditableField
          label="Name:"
          name="fullname"
          value={formValues.fullname}
          editingField={editingField}
          onChange={handleChange}
          onSave={handleSave}
          onEdit={setEditingField}
        />
        <EditableField
          label="Email:"
          name="email"
          value={formValues.email}
          editingField={editingField}
          onChange={handleChange}
          onSave={handleSave}
          onEdit={setEditingField}
        />
        <EditableField
          label="Contact:"
          name="contact"
          value={formValues.contact}
          editingField={editingField}
          onChange={handleChange}
          onSave={handleSave}
          onEdit={setEditingField}
        />

        {/* Bio */}
        <div className="flex flex-col gap-2 w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg shadow-inner p-5 rounded-2xl">
          <label className="font-medium text-gray-700 dark:text-gray-300">Bio:</label>
          <textarea
            name="bio"
            value={formValues.bio || ""}
            onChange={handleChange}
            readOnly={editingField !== "bio"}
            className="w-full min-h-[120px] rounded-xl px-4 py-3 resize-none text-gray-900 dark:text-gray-100 bg-white/70 dark:bg-gray-900/40 outline-none transition focus:ring-2 focus:ring-indigo-400/50 shadow-sm"
          />
          {editingField === "bio" && (
            <button
              onClick={() => handleSave("bio")}
              className="self-end text-green-700 dark:text-green-400 hover:text-green-900 font-semibold px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/40 hover:bg-green-200 dark:hover:bg-green-800/60 transition"
            >
              Save
            </button>
          )}
        </div>

        {/* Extra Info */}
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-300">
          <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl shadow-md">
            <span className="font-medium">💰 Hourly Rate: </span>₹ {user?.price}
          </div>
          <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl shadow-md">
            <span className="font-medium">📅 Joined: </span>{joined}
          </div>
        </div>
      </div>
    </div>
  );
};
