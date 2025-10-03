"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { 
  changeFullnameApi, 
  changeEmailApi, 
  changeAvatarApi 
} from '@/services/student.service';


const Profile = () => {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
  
    const storedStudent = localStorage.getItem('studentUser');
    
    if (storedStudent) {
      const parsedData = JSON.parse(storedStudent);
      setStudent(parsedData);
      setFormData({
        fullname: parsedData.fullname || '',
        email: parsedData.email || '',
        username: parsedData.username || '',
      });
    } else {
      // If not in localStorage, redirect to login
      toast.error('Please login to view your profile');
      router.push('/studentChat/auth/login');
    }
    
    setLoading(false);
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      
      // Update fullname if changed
      if (formData.fullname !== student.fullname) {
        await changeFullnameApi(formData.fullname);
      }
      
      // Update email if changed
      if (formData.email !== student.email) {
        await changeEmailApi(formData.email);
      }
      
      // Update avatar if changed
      if (avatarFile) {
        await changeAvatarApi(avatarFile);
      }
      
      // Update local storage with new data
      const updatedStudent = {
        ...student,
        fullname: formData.fullname,
        email: formData.email,
        avatar: avatarPreview || student.avatar
      };
      
      localStorage.setItem('student', JSON.stringify(updatedStudent));
      setStudent(updatedStudent);
      
      setEditMode(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!student) {
    return <div>No student data found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Student Profile</h1>
        
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4 md:mb-0 md:mr-6">
            {editMode && (
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer z-10">
                <span className="text-white text-sm font-medium">Change Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="opacity-0 absolute inset-0"
                  onChange={handleAvatarChange}
                />
              </label>
            )}
            
            <Image
              src={avatarPreview || student.avatar || '/default-avatar.png'}
              alt="Student Avatar"
              className="object-cover"
              fill
              sizes="(max-width: 128px) 100vw, 128px"
              priority
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            {editMode ? (
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="text-xl font-bold mb-2 w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none px-2 py-1"
              />
            ) : (
              <h2 className="text-xl font-bold mb-2">{student.fullname}</h2>
            )}
            
            <p className="text-gray-500 mb-2">Student</p>
            <p className="text-gray-700">@{student.username}</p>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Contact Information</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800">{student.email}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Academic Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Enrollment Date</label>
              <p className="text-gray-800">{student.enrollmentDate || "Not available"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Student ID</label>
              <p className="text-gray-800">{student.studentId || "Not available"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Program</label>
              <p className="text-gray-800">{student.program || "Not available"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
              <p className="text-gray-800">{student.year || "Not available"}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;