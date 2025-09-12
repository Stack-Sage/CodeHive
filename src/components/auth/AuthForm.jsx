import React from "react";

const AuthForm = ({
  title = "Sign In",
  fields = [],
  buttonText = "Sign In",
  onSubmit,
  showSocial = true,
  agreementLink = "#",
  agreementText = "Learn user licence agreement",
  showBio = false,
  showImageUpload = false,
}) => (
  <div className="max-w-[80vw] lg:max-w-[30vw] md:max-w-[40vw]  mx-auto bg-gradient-to-b from-white  to-blue-50 rounded-3xl p-8 md:p-10 shadow-2xl border border-white mt-10 transition-transform hover:scale-[1.01]">
    <div className="text-center font-extrabold text-3xl md:text-4xl text-blue-600 mb-8">{title}</div>
    
    <form className="space-y-5" onSubmit={onSubmit}>
      {showImageUpload && (
        <div className="flex flex-col items-start">
          <label
            htmlFor="image"
            className="cursor-pointer px-4 py-2 bg-black/70 text-white rounded-xl shadow hover:ring-pink-500 transition"
          >
            Upload Profile Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="hidden"
          />
        </div>
      )}

      {fields.map((field, idx) => (
        <input
          key={idx}
          required={field.required}
          className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-700 transition"
          type={field.type}
          name={field.name}
          id={field.id || field.name}
          placeholder={field.placeholder}
          />
        ))}

      {showBio && (
        <textarea
          name="bio"
          placeholder="Briefly Mention about yourself & your expertise ..."
          className="w-full bg-blue-200/50 border border-black px-5 py-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-800 resize-none h-32 transition"
        />
      )}


      {fields.some(f => f.name === "password") && (
        <span className="block mt-1 text-xs text-blue-500">
          <a href="#">Forgot Password?</a>
        </span>
      )}

      <input
        className="w-full font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 mt-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
        type="submit"
        value={buttonText}
      />
    </form>

    {showSocial && (
      <div className="mt-6">
        <span className="block text-center text-xs text-gray-900 mb-3">Or Sign in with</span>
        <div className="flex justify-center gap-4">
          {["Google", "Apple", "Twitter"].map((platform) => (
            <button
              key={platform}
              className="bg-black bg-gradient-to-r from-black to-gray-700 border-2 border-white p-2 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              {/* You can replace with SVG icon */}
              <span className="text-white text-sm font-bold">{platform[0]}</span>
            </button>
          ))}
        </div>
      </div>
    )}

    <span className="block text-center mt-5 text-xs text-black-500">
      <a href={agreementLink}>{agreementText}</a>
    </span>
  </div>
);

export default AuthForm;
