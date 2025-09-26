"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaLock, FaKey, FaRunning } from "react-icons/fa";
import { buttonStyleTwo } from "@/ui/CustomCSS";
import { useRouter } from "next/navigation";
import {
  deleteProfileApi,
  changeFullnameApi,
  changeContactApi,
  changeEmailApi,
  changePasswordApi,
  forgetPasswordApi,
} from "@/services/user.service";
import { showSuccess, showError } from "@/ui/toast";

import Logout from "./Logout";
import ForgetPassword from "./ForgetPassword";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [showModal, setShowModal] = useState(false);

  const [showForget, setShowForget] = useState(false);

  const router = useRouter();

 const {useLogout} = Logout()
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        User not found.
      </div>
    );
  }

  const joined = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
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
        // If you have changeBio API, add here
        updatedUser.bio = formValues.bio;
      }

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      showSuccess(`${field} updated successfully`);
    } catch (error) {
      showError(`Failed to update ${field}`);
      console.error(`Error updating ${field}:`, error);
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
      console.error("Error deleting profile:", error);
    }
  };


  

  const handleChangePassword = async () => {
    try {
      console.log(passwordForm.currentPassword, passwordForm.newPassword);
      await changePasswordApi(passwordForm.currentPassword, passwordForm.newPassword);
    
      showSuccess("Password changed successfully.");
      setShowPasswordForm(false);
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (error) {
      showError("Failed to change password");
      console.error("Error in change password:", error);
    }
  };


  const EditableField = ({ label, name, type = "text" }) => (
    <div className="flex items-center gap-2">
      {label && <span className="font-semibold">{label}</span>}
      <input
        type={type}
        name={name}
        value={formValues[name] || ""}
        onChange={handleChange}
        readOnly={editingField !== name}
        className={`bg-transparent border-none focus:ring-0 ${
          editingField === name ? "border-b border-indigo-500" : ""
        }`}
      />
      {editingField === name ? (
        <button
          onClick={() => handleSave(name)}
          className="text-green-600 hover:text-green-800"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setEditingField(name)}
          className="text-indigo-600 hover:text-indigo-800"
        >
          <FaEdit />
        </button>
      )}
    </div>
  );

  return (

    <section className="max-w-5xl mx-auto p-6 min-h-screen pt-10 flex flex-col gap-6">
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.fullname || "User"}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          />
          <button className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 shadow-md">
            <FaEdit />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          
          <EditableField label="" name="fullname" />

        
          <div className="flex items-center gap-2">
            <textarea
              name="bio"
              value={formValues.bio || ""}
              onChange={handleChange}
              readOnly={editingField !== "bio"}
              className={`w-full bg-transparent border-none focus:ring-0 resize-none ${
                editingField === "bio" ? "border-b border-indigo-500" : ""
              }`}
            />
            {editingField === "bio" ? (
              <button
                onClick={() => handleSave("bio")}
                className="text-green-600 hover:text-green-800"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditingField("bio")}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <FaEdit />
              </button>
            )}
          </div>

        
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-800">
            <EditableField label="📧 Email:" name="email" type="email" />
            <EditableField label="📞 Contact:" name="contact" />

            <div>
              <span className="font-semibold">Hourly Rate: </span>
              {"₹ "}
              {user?.price}
            </div>

            <div>
              <span className="font-semibold">📅 Joined: </span>
              {joined}
            </div>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
     
        <button
          onClick={() => setShowPasswordForm(true)}
          className={`${buttonStyleTwo} px-4 py-3 bg-black/20 rounded-xl flex items-center gap-2 shadow-lg`}
        >
          <FaKey /> Change Password
        </button>

       
        <button
          onClick={() => setShowForget(!showModal)}

          className={`${buttonStyleTwo} px-4 py-3 bg-black/20 rounded-xl flex items-center gap-2 shadow-lg`}
        >
          <FaLock /> Forgot Password
        </button>

        <button
          onClick={deleteProfile}
          className={`${buttonStyleTwo} px-4 py-3 bg-black/20 rounded-xl flex items-center gap-2 shadow-lg`}
        >
          <FaTrash /> Delete Profile
        </button>

        <button
          onClick={useLogout}
          className= {`${buttonStyleTwo} px-4 py-3 bg-black/20 rounded-xl flex items-center gap-2 shadow-lg`}
        >
          <FaRunning /> Logout
        </button>

      
        <button
          className="col-span-full text-center text-lg bg-black/40 rounded-xl px-4 py-4 flex items-center gap-2 shadow-xl text-gray-900 italic"
          onClick={() => router.push("/student")}
        >
          Check other Teachers
        </button>
      </div>


        
      
      {showForget && (
        <ForgetPassword showModal={showForget} setShowModal={setShowForget} />
      )}
               

      {showPasswordForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
            <input
              type="password"
              placeholder="Current Password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
              }
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
              }
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500  "
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPasswordForm(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyProfile;
