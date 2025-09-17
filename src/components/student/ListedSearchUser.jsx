'use client'

import React from 'react'
import { useGlobalContext } from '@/context/global.context'
import { buttonStyleTwo } from '@/ui/CustomCSS'
import { FaFlag, FaPhone, FaRegCopy, FaThumbsUp, FaUserAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const ListedSearchUser = () => {
  const { searchResults } = useGlobalContext();
  const router = useRouter();

  const handleCopy = async (e, text, label) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(String(text ?? ''));
      alert(`${label} copied to clipboard`);
    } catch {
      alert(`Failed to copy ${label.toLowerCase()}`);
    }
  };

  const toProfile = (id) => router.push(`/student/${id}`);

  return (
    <section className="max-w-6xl item-center justify-center mx-auto my-10 p-4 flex flex-col gap-6">
      {(!searchResults || searchResults.length === 0) ? (
        <p className="text-gray-500 text-center">No educators found.</p>
      ) : (
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-gray-800">Total Search Results: {searchResults.length}</h2>
          {searchResults.map(user => (
            <div
              key={user._id}
              className="bg-white/10 magical-gradient min-w-[90%] lg:max-w-[90%] items-center justify-center rounded-2xl shadow-lg hover:shadow-2xl ring-1 ring-white/50 hover:ring-sky-500 transition-all duration-300 ease-out hover:scale-[1.01] cursor-pointer overflow-hidden hover:bg-white/20"
              onClick={() => toProfile(user._id)}
            >
              {/* Mobile */}
              <div className="flex flex-col p-6 gap-4 md:hidden">
                <div className="flex relative items-center justify-start gap-4">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.fullname || 'User'}
                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-900 shadow-md"
                  />
                  <h3 className="text-lg font-bold text-gray-900">{user.fullname}</h3>
                  {user?.price && (
                    <p className="text-sm font-semibold italic tracking-tight text-gray-800 absolute right-2">
                      Hourly Rate: {user?.price} ₹
                    </p>
                  )}
                  {user.createdAt && (
                    <p className="text-xs text-gray-800 absolute right-2 mt-10">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {user.bio && (
                  <p className="text-sm text-gray-600 flex flex-wrap">{user.bio}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-700 items-start sm:items-center">
                  <div className="flex flex-row items-center gap-2">
                    <p><span className="font-medium">📧 Email:</span> {user.email}</p>
                    <FaRegCopy
                      className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                      onClick={(e) => handleCopy(e, user.email, 'Email')}
                      title="Copy Email"
                    />
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <p><span className="font-medium">📞 Contact:</span> {user.contact}</p>
                    <FaRegCopy
                      className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                      onClick={(e) => handleCopy(e, user.contact, 'Contact')}
                      title="Copy Contact"
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-center w-full items-center gap-4">
                  <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic rounded-lg text-md`} onClick={(e) => { e.stopPropagation(); toProfile(user._id); }}>
                    <FaUserAlt/>
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic rounded-lg text-md`} onClick={(e) => e.stopPropagation()}>
                    <FaPhone/>
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic rounded-lg text-md`} onClick={(e) => e.stopPropagation()}>
                    <FaThumbsUp/>
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic rounded-lg text-md`} onClick={(e) => e.stopPropagation()}>
                    <FaFlag/>
                  </button>
                </div>
              </div>

              {/* Desktop / Tablet */}
              <div className="hidden md:flex items-center justify-between p-6 gap-6">
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt={user.fullname || 'User'}
                  className="w-32 h-32 rounded-full object-cover border-2 border-indigo-900 shadow-md"
                />

                <div className="flex flex-row gap-4 justify-between w-full">
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {user.fullname}
                      {user?.price && (
                        <span className="ml-3 text-sm font-semibold italic tracking-tight text-gray-800">
                          Hourly Rate: {user?.price}
                        </span>
                      )}
                    </h3>

                    <div className="flex flex-col gap-3 text-sm text-gray-700 items-start justify-start">
                      <div className="flex items-center flex-row gap-2">
                        <p><span className="font-medium">📧 Email:</span> {user.email}</p>
                        <FaRegCopy
                          className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                          onClick={(e) => handleCopy(e, user.email, 'Email')}
                          title="Copy Email"
                        />
                      </div>

                      <div className="flex items-center flex-row gap-2">
                        <p><span className="font-medium">📞 Contact:</span> {user.contact}</p>
                        <FaRegCopy
                          className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                          onClick={(e) => handleCopy(e, user.contact, 'Contact')}
                          title="Copy Contact"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col italic text-md items-center justify-center mx-10">
                    <p className="text-lg font-semibold text-gray-600">About Me:</p>
                    {user.bio && (
                      <p className="text-md italic text-center flex-wrap -mt-1 text-gray-700">{user.bio}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[160px]">
                  <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic items-center text-center flex flex-row gap-2 justify-center rounded-lg text-md`} onClick={(e) => { e.stopPropagation(); toProfile(user._id); }}>
                    <FaUserAlt/> View Profile
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic items-center text-center flex flex-row gap-2 justify-center rounded-lg text-md`} onClick={(e) => e.stopPropagation()}>
                    <FaPhone/> Contact
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic items-center text-center flex flex-row gap-2 justify-center rounded-lg text-md`} onClick={(e) => e.stopPropagation()}>
                    <FaThumbsUp/> Favorite
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic items-center text-center flex flex-row gap-2 justify-center rounded-lg text-md`} onClick={(e) => e.stopPropagation()}>
                    <FaFlag /> Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ListedSearchUser