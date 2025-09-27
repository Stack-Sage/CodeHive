"use client";
import React from "react";
import { FaEdit } from "react-icons/fa";

export const EditableField = ({ label, name, value, editingField, onChange, onSave, onEdit }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
    <span className="font-medium min-w-[110px] text-gray-700">{label}</span>
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        readOnly={editingField !== name}
        className={`w-full md:w-auto bg-gray-50/15 outline-none border-none font-semibold shadow-sm shadow-black/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all duration-200 ease-in ${
          editingField !== name ? "cursor-default text-gray-600" : "text-gray-900"
        }`}
      />
      {editingField === name ? (
        <button
          onClick={() => onSave(name)}
          className="text-green-900 hover:text-green-800 font-semibold px-3 py-1 rounded-lg bg-white hover:bg-green-200"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => onEdit(name)}
          className="self-end text-indigo-900 hover:text-indigo-800 font-semibold px-3 py-3 rounded-full bg-white hover:bg-violet-100 cursor-pointer shadow-lg transition-transform transform hover:scale-110 duration-300 ease-in-out"
        >
          <FaEdit />
        </button>
      )}
    </div>
  </div>
);

export const ProfileCard = ({ user, editingField, formValues, setEditingField, handleChange, handleSave }) => {
  const joined = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—";

  return (
    <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="relative flex-shrink-0">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={user.fullname || "User"}
          className="w-44 h-44 md:w-52 md:h-52 rounded-full object-cover border-4 border-neutral-100 shadow-lg"
        />
        <button className="absolute bottom-3 right-3 bg-indigo-100 text-black p-2 rounded-full hover:bg-indigo-200 shadow-md transition-transform transform hover:scale-110">
          <FaEdit />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-6">
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

        <div className="flex flex-col gap-2 w-full bg-gray-100/10  shadow-black/20 p-4 rounded-xl shadow-inner">
          <label className="font-medium text-gray-700">Bio:</label>
          <textarea
            name="bio"
            value={formValues.bio || ""}
            onChange={handleChange}
            readOnly={editingField !== "bio"}
            className="w-full min-h-[100px] md:min-h-[120px] outline-none border-none bg-white/20 border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400/50 duration-200 ease-in transition-all text-gray-900 hover:shadow-md hover:shadow-black/10"
          />
          {editingField === "bio" ? (
            <button
              onClick={() => handleSave("bio")}
              className="self-end text-green-600 hover:text-green-800 font-semibold px-3 py-3 rounded-lg bg-green-100 hover:bg-green-200"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditingField("bio")}
              className="self-end text-indigo-900 hover:text-indigo-800 font-semibold px-3 py-3 rounded-full bg-white hover:bg-violet-100 cursor-pointer shadow-lg transition-transform transform hover:scale-110 duration-300 ease-in-out"
            >
              <FaEdit />
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <div className="bg-gray-50/30 p-3 rounded-lg shadow-sm">
            <span className="font-medium">Hourly Rate: </span>₹ {user?.price}
          </div>
          <div className="bg-gray-50/30 p-3 rounded-lg shadow-sm">
            <span className="font-medium">📅 Joined: </span>
            {joined}
          </div>
        </div>
      </div>
    </div>
  );
};
