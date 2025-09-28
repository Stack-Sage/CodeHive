"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileCard } from "./ProfileCard";
import { ActionButtons } from "./ActionButtons";
import Logout from "./Logout";
import {
  deleteProfileApi,
  changeFullnameApi,
  changeContactApi,
  changeEmailApi,
  changePasswordApi,
  changeBioApi,
  changeAvatarApi,
} from "@/services/user.service";
import { showSuccess, showError } from "@/ui/toast";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [showForget, setShowForget] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const router = useRouter();
  const { useLogout } = Logout();

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setFormValues(parsed);
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (file) => {
  setAvatarPreview(URL.createObjectURL(file));

  try {
    const result = await changeAvatarApi(file); // result is the API response object
    if (result && result.success && result.data) {
      setFormValues(prev => ({ ...prev, avatar: result.data.avatar }));
      setUser(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      showSuccess("Avatar updated successfully");
    } else {
      showError(result?.message || "Failed to upload avatar");
    }
  } catch (error) {
    showError("Failed to upload avatar");
    console.error(error);
  }
};

  const handleSave = async (field) => {
    try {
      let updatedUser = { ...user };

      if (field === "fullname") {
        await changeFullnameApi(formValues.fullname);
        updatedUser.fullname = formValues.fullname;
      } else if (field === "email") {
        await changeEmailApi(formValues.email);
        updatedUser.email = formValues.email;
      } else if (field === "contact") {
        await changeContactApi(formValues.contact);
        updatedUser.contact = formValues.contact;
      } else if (field === "bio") {
        await changeBioApi(formValues.bio);
        updatedUser.bio = formValues.bio;
      }

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      showSuccess(`${field} updated successfully`);
    } catch (error) {
      showError(`Failed to update ${field}`);
      console.error(error);
    } finally {
      setEditingField(null);
    }
  };

  const deleteProfile = async () => {
    try {
      await deleteProfileApi();
      localStorage.removeItem("user");
      showSuccess("Profile deleted successfully.");
      router.push("/register");
    } catch (error) {
      showError("Failed to delete profile");
      console.error(error);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-500 animate-pulse">Loading profile...</div>;
  if (!user) return <div className="flex items-center justify-center min-h-screen text-red-500">User not found.</div>;

  return (
    <section className="max-w-6xl mx-auto p-6 min-h-screen bg-gradient-to-br flex flex-col gap-10">
      <ProfileCard
        user={user}
        editingField={editingField}
        formValues={formValues}
        setEditingField={setEditingField}
        handleChange={handleChange}
        handleSave={handleSave}
        handleAvatarChange={handleAvatarChange}
        avatarPreview={avatarPreview}
      />

      <ActionButtons
        useLogout={useLogout}
        deleteProfile={deleteProfile}
        setShowPasswordForm={setShowPasswordForm}
        showForget={showForget}
        setShowForget={setShowForget}
        router={router}
      />

      {showPasswordForm && (
        <div className="fixed inset-0 bg-black/20 flex backdrop-blur-sm items-center justify-center z-50 p-4">
          <div className="bg-black/70 rounded-2xl shadow-2xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-gray-100">Change Password</h2>
            <input
              type="password"
              placeholder="Current Password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="w-full border text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
              className="w-full border rounded-lg px-3 text-white py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowPasswordForm(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
              <button onClick={async () => {
                try {
                  await changePasswordApi(passwordForm.currentPassword, passwordForm.newPassword);
                  showSuccess("Password changed successfully");
                  setShowPasswordForm(false);
                  setPasswordForm({ currentPassword: "", newPassword: "" });
                } catch { showError("Failed to change password"); }
              }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyProfile;
