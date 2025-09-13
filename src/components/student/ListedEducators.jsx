'use client'
import React, { useEffect } from 'react'
import { useGlobalContext } from '@/context/global.context'
import useUserHook from '@/hooks/user.hook'

const ListedEducators = () => {
  const { getAllUser } = useUserHook();
  const { setAllUser, allUser, visitedUser, setVisitedUser } = useGlobalContext();

  useEffect(() => {
    getAllUser();
    if (allUser.length > 0) {
      console.log("all user in listed educators is ", allUser)
    }
  }, [allUser.length]);

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Listed Educators
      </h2>

      {(!allUser || allUser.length === 0) ? (
        <p className="text-gray-500 text-center">No educators found.</p>
      ) : (
        <div className="space-y-6 flex items-center justify-center mx-auto  flex-wrap space-x-6 ">
          {allUser.map(user => (
            <div
              key={user._id}
              className="bg-white/10  magical-gradient min-w-[90%] lg:min-w-[40%]   rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition transform hover:scale-[1.01] cursor-pointer overflow-hidden"
              onClick={() => setVisitedUser(user)}
            >
              <div className="flex items-center gap-6 p-6">
                {/* Avatar */}
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt={user.fullname}
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-300 shadow-md"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 ">
                    {user.fullname}
                  </h3>

                  {user.bio && (
                    <p className="text-sm text-gray-600 flex flex-wrap mt-1 ">
                      {user.bio}
                    </p>
                  )}

                  <div className="mt-3 space-y-1 text-sm text-gray-700 ">
                    <p><span className="font-medium">📧 Email:</span> {user.email}</p>
                    <p><span className="font-medium">📞 Contact:</span> {user.contact}</p>
                  </div>

                  {user.createdAt && (
                    <p className="mt-3 text-xs text-gray-800 ">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  )}
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
