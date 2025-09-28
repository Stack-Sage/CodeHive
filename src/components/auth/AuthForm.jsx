'use client';
import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/ui/CropImage";
import { buttonStyle } from "@/ui/CustomCSS";

const AuthForm = ({
  title = "Register",
  fields = [],
  buttonText = "Register",
  onSubmit, // handleRegister from parent
  agreementLink = "/login",
  agreementText = "Already have an account? Log In",
  showBio = true,
  showImageUpload = true,
}) => {
  const [image, setImage] = useState(null); // original uploaded image
  const [preview, setPreview] = useState(null); // cropped preview
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null); // reference to the hidden input

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setPreview(null);
    }
  };

  const handleCropSave = async () => {
    if (!image || !croppedAreaPixels) return;

    const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
    const croppedFile = new File([croppedBlob], "avatar.jpg", { type: "image/jpeg" });

    // Set cropped image as input value using DataTransfer
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(croppedFile);
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }

    setPreview(URL.createObjectURL(croppedBlob));
    setImage(null); // hide cropper
  };

  return (
    <div className="w-[85%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-auto bg-white/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/30">
      <div className="text-center font-extrabold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-5">
        {title}
      </div>

      <form className="w-full space-y-4" onSubmit={onSubmit} encType="multipart/form-data">
        {showImageUpload && (
          <div className="flex flex-col items-center space-y-3">
            <label
              htmlFor="avatar"
              className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-purple-500 shadow cursor-pointer group"
            >
              {preview ? (
                <img src={preview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-white/40">+</div>
              )}
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
              />
            </label>

            {image && (
              <div className="relative w-full max-w-[600px] h-[400px] lg:h-[500px] bg-gray-800 rounded-xl overflow-hidden mt-4">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={true}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
                <button
                  type="button"
                  onClick={handleCropSave}
                  className="absolute bottom-3 right-3 px-4 py-2 bg-green-600 text-white rounded-lg shadow"
                >
                  Save Crop
                </button>
              </div>
            )}
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
