"use client";
import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/ui/CropImage";
import { registerStudentApi } from "@/services/student.service";
import LoadingHand from "@/components/auth/LoadingHand";
import { showError, showSuccess } from "@/ui/toast";

import { useRouter } from "next/navigation";

export default function Register() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const router = useRouter();

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleCropSave = async () => {
    if (!image || !croppedAreaPixels) return;

    const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
    const file = new File([croppedBlob], "avatar.jpg", { type: "image/jpeg" });

    setCroppedFile(file);
    setPreview(URL.createObjectURL(croppedBlob));
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);

      if (croppedFile) {
        formData.set("avatar", croppedFile); 
      }

 

      await registerStudentApi(formData);


      showSuccess("🎉 Registration successful! Please log in.");
      router.push("atudentChat/auth/login");

      
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      showError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 relative">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <LoadingHand />
        </div>
      )}

      <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30">
        <h2 className="text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6">
          Student Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <label className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-purple-500 shadow cursor-pointer group">
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-white/40 text-3xl">
                  +
                </div>
              )}
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
            </label>

            {image && (
              <div className="relative w-full h-64 bg-gray-800 rounded-xl mt-4 overflow-hidden">
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
                  className="absolute bottom-3 right-3 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Save Crop
                </button>
              </div>
            )}
          </div>

          {/* Input Fields */}
          <input
            name="username"
            type="text"
            placeholder="Full Name"
            required
            className="w-full bg-white/40 border border-gray-200 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full bg-white/40 border border-gray-200 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full bg-white/40 border border-gray-200 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="submit"
            value={loading ? "Registering..." : "Register"}
            disabled={loading}
            className="w-full font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white py-3 rounded-xl shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
          />
        </form>

        <p className="text-center mt-6 text-sm text-gray-700">
          Already have an account?{" "}
          <a href="/studentChat/auth/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
