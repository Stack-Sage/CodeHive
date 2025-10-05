"use client";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { ActionButtons } from "./ActionButtons";

export const EditableField = ({
  label,
  name,
  value,
  editingField,
  onChange,
  onSave,
  onEdit,
}) => (
  <div className="flex flex-col gap-2 w-full mb-2">
    <label className="font-medium min-w-[110px] text-black mb-1">
      {label}
    </label>
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        readOnly={editingField !== name}
        className={`w-full bg-white/40 outline-none border-none font-semibold rounded-lg px-4 py-2 text-sm transition-all duration-200 ease-in shadow-sm ${
          editingField !== name
            ? "cursor-default text-black"
            : "text-black ring-2 ring-indigo-400/50"
        }`}
      />
      {editingField === name ? (
        <button
          onClick={() => onSave(name)}
          className="text-black hover:text-indigo-900 font-semibold px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => onEdit(name)}
          className="p-3 rounded-full bg-white text-black shadow-md hover:bg-gray-200 hover:text-indigo-700 transition-transform transform hover:scale-110 duration-300"
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
  useLogout,
  deleteProfile,
  setShowPasswordForm,
  showForget,
  setShowForget,
  router,
}) => {
  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "—";
  const updated = user.updatedAt
    ? new Date(user.updatedAt).toLocaleDateString()
    : "—";

  return (
    <div className="relative w-full max-w-6xl 2xl:max-w-8xl mx-auto bg-gradient-to-br from-blue-100 via-indigo-50 to-blue-200 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden p-8 xl:p-20 flex flex-col md:flex-row gap-20 items-center md:items-start border border-indigo-100 min-h-[70vh]">
      {/* Glowing background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-200/30 via-blue-100/20 to-blue-300/20 blur-2xl"></div>

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-indigo-400 blur-2xl opacity-30 animate-pulse"></div>
        <img
          src={avatarPreview || user.avatar || "/default-avatar.png"}
          alt={user.fullname || "User"}
          className="relative w-36 h-36 xl:w-56 xl:h-56 rounded-full object-cover shadow-xl ring-4 ring-blue-200"
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
          className="absolute bottom-3 right-3 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          <FaEdit />
        </button>
      </div>

      {/* User Info */}
      <div className="flex-1 flex flex-col gap-16">
        {/* Grid for fields */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-20 gap-y-6 w-full">
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
          {/* Educator-only fields */}
          {user.roles?.includes("educator") && (
            <>
              <EditableField
                label="Country:"
                name="country"
                value={formValues.country || ""}
                editingField={editingField}
                onChange={handleChange}
                onSave={handleSave}
                onEdit={setEditingField}
              />
              <EditableField
                label="Date of Birth:"
                name="dob"
                value={formValues.dob ? new Date(formValues.dob).toLocaleDateString() : ""}
                editingField={editingField}
                onChange={handleChange}
                onSave={handleSave}
                onEdit={setEditingField}
              />
              <EditableField
                label="Skills:"
                name="skills"
                value={Array.isArray(formValues.skills) ? formValues.skills.join(", ") : (formValues.skills || "")}
                editingField={editingField}
                onChange={handleChange}
                onSave={handleSave}
                onEdit={setEditingField}
              />
              <EditableField
                label="Hourly Rate (₹):"
                name="price"
                value={formValues.price || ""}
                editingField={editingField}
                onChange={handleChange}
                onSave={handleSave}
                onEdit={setEditingField}
              />
            </>
          )}
        </div>
      

        {user.roles?.includes("educator") && (
          <div className="flex flex-col gap-4 w-full bg-blue-50/80 backdrop-blur-lg shadow-inner p-5 rounded-2xl mt-2">
            <label className="font-medium text-black mb-1">Bio:</label>
            <textarea
              name="bio"
              value={formValues.bio || ""}
              onChange={handleChange}
              readOnly={editingField !== "bio"}
              className="w-full min-h-[120px] rounded-xl px-4 py-3 resize-none text-black bg-blue-100 outline-none transition focus:ring-2 focus:ring-indigo-400/50 shadow-sm"
            />
            {editingField === "bio" && (
              <button
                onClick={() => handleSave("bio")}
                className="self-end text-black font-semibold px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Save
              </button>
            )}
          </div>
        )}
       
        <div className="grid sm:grid-cols-2 gap-12 text-sm text-black mt-2">
          <div className="bg-blue-50/80 backdrop-blur-lg p-4 rounded-xl shadow-md">
            <span className="font-medium">📅 Joined: </span>
            {joined}
          </div>
          <div className="bg-blue-50/80 backdrop-blur-lg p-4 rounded-xl shadow-md">
            <span className="font-medium">📝 Last Updated: </span>
            {updated}
          </div>
        </div>
     

     
        <div className="mt-1 w-full">
          <ActionButtons
            useLogout={useLogout}
            deleteProfile={deleteProfile}
            setShowPasswordForm={setShowPasswordForm}
            showForget={showForget}
            setShowForget={setShowForget}
            router={router}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};