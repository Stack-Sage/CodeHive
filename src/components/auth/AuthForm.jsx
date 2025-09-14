'use client'
import React from "react";
import { buttonStyle } from "@/ui/CustomCSS";

const AuthForm = ({
  title = "Register",
  fields = [],
  buttonText = "Register",
  onSubmit,
  agreementLink = "/login",
  agreementText = "Already have an account? Log In",
  showBio = true,
  showImageUpload = true,
}) => {
  return (
    <div className="w-[85%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-auto bg-white/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/30">
      <div className="text-center font-extrabold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-5">
        {title}
      </div>

      <form
        className="w-full space-y-4"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        {showImageUpload && (
          <div className="flex flex-col items-center">
            <label
              htmlFor="avatar"
              className="cursor-pointer px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-[1.02] transition"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar" // must match multer.single('avatar')
              accept="image/*"
              className="hidden"
            />
          </div>
        )}

        {fields.map((f, i) => (
          <input
            key={i}
            required={f.required}
            className="w-full bg-white/40 border border-gray-200 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type={f.type}
            name={f.name}
            id={f.id || f.name}
            placeholder={f.placeholder}
          />
        ))}

        {showBio && (
          <textarea
            name="bio"
            placeholder="Briefly mention about yourself & your expertise ..."
            className="w-full bg-white/40 border border-gray-200 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[110px]"
          />
        )}

        <span className="block text-center mt-8 text-xs text-gray-700">
          <a href={agreementLink} className="hover:underline">
            {agreementText}
          </a>
        </span>

        <input
          className={`w-full font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white py-3 mt-4 rounded-xl shadow-lg hover:scale-[1.02] transition ${buttonStyle}`}
          type="submit"
          value={buttonText}
        />
      </form>
    </div>
  );
};

export default AuthForm;
