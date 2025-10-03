'use client'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/global.context'
import useUserHook from '@/hooks/user.hook'
import { buttonStyleTwo } from '@/ui/CustomCSS'
import { FaFlag, FaPhone, FaRegComment, FaRegCommentAlt, FaRegCopy, FaSnapchat, FaThumbsUp, FaUserAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

// Shimmer skeleton for user card
const UserCardShimmer = () => {
  return (
    <div className="bg-white/10 magical-gradient min-w-[90%] rounded-2xl shadow-lg p-6 flex flex-col gap-4 md:flex-row md:gap-6 overflow-hidden relative">
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer"></div>

      {/* Avatar */}
      <div className="w-14 h-14 md:w-32 md:h-32 rounded-full bg-gray-300 border-2 border-indigo-900 shadow-md relative z-10"></div>

      {/* Text content */}
      <div className="flex-1 flex flex-col gap-2 md:gap-4 relative z-10">
        <div className="h-6 rounded w-1/3 md:w-1/4 bg-gray-300"></div>
        <div className="h-4 rounded w-2/3 md:w-1/2 bg-gray-300"></div>
        <div className="h-4 rounded w-full md:w-3/4 bg-gray-300"></div>
        <div className="flex flex-row gap-2 mt-2">
          <div className="h-4 rounded w-1/2 bg-gray-300"></div>
          <div className="h-4 rounded w-1/3 bg-gray-300"></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 relative z-10">
        <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
        <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
        <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
        <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}

const ListedEducators = () => {
  const { getAllUser } = useUserHook();
  const { allUser, openChatWithUser, startChatWithUser } = useGlobalContext();
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await getAllUser()
      setLoading(false)
    }
    fetchUsers()
  }, [])

  return (
    <section className="max-w-6xl lg:min-w-5xl item-center justify-center mx-auto my-10 p-4 flex flex-col gap-6">
      {loading
        ? Array.from({ length: 5 }).map((_, i) => <UserCardShimmer key={i} />)
        : (
          <div className="flex flex-col gap-8">
            {allUser.map(user => (
              <div
                key={user._id}
                className="bg-white/10 magical-gradient min-w-[90%] items-center justify-center rounded-2xl shadow-lg hover:shadow-2xl ring-1 ring-white/50 hover:ring-sky-500 transition-all duration-300 ease-out hover:scale-[1.01] cursor-pointer overflow-hidden hover:bg-white/20"
              >
                {/* Mobile layout */}
                <div className="flex flex-col p-6 gap-4 md:hidden">
                  <div className="flex relative items-center justify-start gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-900 shadow-md">
                      <img
                        src={user.avatar || "/default-avatar.png"}
                        alt={user.fullname}
                        className="w-14 h-14 object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{user.fullname}</h3>

                    {user.createdAt && (
                      <p className="text-xs text-gray-800 absolute right-2 ">
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    )}
                    {user?.price && (
                      <p className="text-sm font-semibold italic tracking-tight text-gray-800 absolute right-2 mt-12 hover:animate-pulse">
                        Hourly Rate: ₹ {user?.price}
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
                        onClick={() =>
                          navigator.clipboard.writeText(user.email) &&
                          confirm("Email copied to clipboard")
                        }
                        title="Copy Email"
                      />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <p><span className="font-medium">📞 Contact:</span> {user.contact}</p>
                      <FaRegCopy
                        className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                        onClick={() =>
                          navigator.clipboard.writeText(user.contact) &&
                          confirm("Contact copied to clipboard")
                        }
                        title="Copy Contact"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row justify-center w-full items-center gap-4">
                    <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic rounded-lg text-md`}
                    onClick={() => router.push(`/student/${user._id}`)}>
                      <FaUserAlt />
                    </button>
                    <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic rounded-lg text-md`}
                    onClick={() => startChatWithUser(user._id)}>
                      <FaRegComment />
                    </button>
                    <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic rounded-lg text-md`}>
                      <FaPhone />
                    </button>
                    <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic rounded-lg text-md`}>
                      <FaThumbsUp />
                    </button>
                    <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic rounded-lg text-md`}>
                      <FaFlag />
                    </button>
                  </div>
                </div>

                {/* Desktop / Tablet Layout */}
                <div className="hidden md:flex items-center justify-between p-6 gap-6">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.fullname}
                    className="w-32 h-32 rounded-full object-cover border-2 border-indigo-900 shadow-md bg-white"
                  />

                  <div className="flex flex-row gap-4 justify-between w-full">
                    <div className="flex-1 flex flex-col gap-2">
                      <h3 className="text-xl flex-col flex w-fit p-1 justify-start font-bold text-gray-900">
                        <span>{user.fullname}</span>
                        {user?.price && (
                          <span className="ml-3 text-sm font-semibold italic tracking-tight text-indigo-950 hover:animate-pulse duration-100 ease-in-out">
                            Hourly Rate: ₹ {user?.price}
                          </span>
                        )}
                      </h3>

                      <div className="flex flex-col gap-3 text-sm text-gray-700 items-start justify-start">
                        <div className="flex items-center flex-row gap-2">
                          <p><span className="font-medium">📧 Email:</span> {user.email}</p>
                          <FaRegCopy
                            className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                            onClick={() =>
                              navigator.clipboard.writeText(user.email) &&
                              confirm("Email copied to clipboard")
                            }
                            title="Copy Email"
                          />
                        </div>

                        <div className="flex items-center flex-row gap-2">
                          <p><span className="font-medium">📞 Contact:</span> {user.contact}</p>
                          <FaRegCopy
                            className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                            onClick={() =>
                              navigator.clipboard.writeText(user.contact) &&
                              confirm("Contact copied to clipboard")
                            }
                            title="Copy Contact"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col italic text-md items-center justify-center mx-10">
                      <p className="text-lg font-semibold text-gray-600">About Me:</p>
                      {user.bio && (
                        <p className="text-md italic text-center flex-wrap -mt-1 text-gray-700">
                          {user.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 min-w-[160px]">
                    <button
                      className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic flex flex-row gap-2 justify-center items-center rounded-lg text-md`}
                      onClick={() => router.push(`/student/${user._id}`)}
                    >
                      <FaUserAlt /> View Profile
                    </button>
                    <button
                      className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic flex flex-row gap-2 justify-center rounded-lg text-md items-center `  }
                      onClick={() => startChatWithUser(user._id)}
                    >
                      <FaRegComment/> Message
                    </button>
                    <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic flex flex-row gap-2 justify-center rounded-lg text-md item-center`}>
                      <FaThumbsUp /> Favorite
                    </button>
                    <button className={`${buttonStyleTwo} px-3 py-2 scale-90 hover:scale-[0.94] italic flex flex-row gap-2 justify-center rounded-lg text-md items-center`}>
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

export default ListedEducators
