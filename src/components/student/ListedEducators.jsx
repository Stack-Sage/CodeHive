'use client'
import React, { useEffect } from 'react'
import { useGlobalContext } from '@/context/global.context'
import useUserHook from '@/hooks/user.hook'
import { buttonStyle, buttonStyleTwo } from '@/ui/CustomCSS'
import { FaFlag, FaPhone, FaRegCopy, FaThumbsUp, FaUserAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const ListedEducators = () => {
  const { getAllUser } = useUserHook();
  const { allUser, setVisitedUser } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    getAllUser();
    if (allUser.length > 0) {
      console.log("all user in listed educators is ", allUser)
    }
  }, [allUser.length]);


  return (
    <section className="max-w-6xl item-center justify-center  mx-auto my-10 p-4 flex flex-col gap-6 ">
      

      {(!allUser || allUser.length === 0) ? (
        <p className="text-gray-500 text-center">No educators found.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {allUser.map(user => (
            <div
              key={user._id}
              className="bg-white/10 magical-gradient min-w-[90%] lg:max-w-[80%] items-center justify-center rounded-2xl shadow-lg hover:shadow-2xl 
                         ring-1 ring-white/50 hover:ring-sky-500 transition-all duration-300 
                         ease-out hover:scale-[1.01] cursor-pointer overflow-hidden  hover:bg-white/20"
              onClick={() => router.push(`/student/${user._id}`)}
            >
              {/* Mobile Layout */}
              <div className="flex flex-col p-6 gap-4 md:hidden">
               
                <div className="flex relative items-center justify-start gap-4">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.fullname}
                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-900 shadow-md"
                  />
                  <h3 className="text-lg font-bold text-gray-900">{user.fullname}</h3>
                     {user.createdAt && (
                    <p className="text-xs text-gray-800 absolute right-2 ">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Bio */}
                {user.bio && (
                  <p className="text-sm text-gray-600 flex flex-wrap">{user.bio}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-700 items-start sm:items-center">
                 
                    <div className="flex flex-row items-center gap-2">
                      <p>
                        <span className="font-medium">📧 Email:</span> {user.email}
                      </p>
                      <FaRegCopy
                        className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(user.email) && confirm("Email copied to clipboard")}
                        title="Copy Email"
                      />
                    </div>

                    
                    <div className="flex flex-row items-center gap-2">
                      <p>
                        <span className="font-medium">📞 Contact:</span> {user.contact}
                      </p>
                      <FaRegCopy
                        className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(user.contact) && confirm("Contact copied to clipboard") }
                        title="Copy Contact "
                      />
                    </div>
                  </div>

              

             
                 <div className="flex flex-row justify-center w-full items-center  gap-4  ">
                  <button className= {` px-3 py-2 scale-90 hover:scale-[0.94] italic  ${buttonStyleTwo}  rounded-lg  text-md `}> <FaUserAlt/> </button>
                  <button className= {` px-3 py-2 scale-90 hover:scale-[0.94] italic ${buttonStyleTwo}  rounded-lg  text-md `}> <FaPhone/> </button>
                  <button className= {` px-3 py-2 scale-90 hover:scale-[0.94] italic ${buttonStyleTwo}  rounded-lg  text-md `}> <FaThumbsUp/> </button>
                  <button className= {` px-3 py-2 scale-90 hover:scale-[0.94] italic  ${buttonStyleTwo}  rounded-lg  text-md `}><FaFlag/> </button>
                </div>

              </div>

              {/* Desktop / Tablet Layout */}
              <div className="hidden md:flex items-center justify-between p-6 gap-6">
                {/* Left - avatar */}
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt={user.fullname}
                  className="lg:w-32 lg:h-32 w-24 h-24 rounded-full object-cover border-2 border-indigo-900 shadow-md"
                />
                <div className=' flex flex-row gap-4 justify-between  w-full  '>
                {/* Middle - info spread out */}
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-gray-900">{user.fullname}</h3>
                 
                   <div className="flex flex-col gap-3 text-sm text-gray-700 items-start justify-start ">
                 
                    <div className="flex items-center flex-row gap-2">
                      <p>
                        <span className="font-medium">📧 Email:</span> {user.email}
                      </p>
                      <FaRegCopy
                        className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(user.email) && confirm("Email copied to clipboard")}
                        title="Copy Email"
                      />
                    </div>


                    <div className="flex items-center flex-row gap-2">
                      <p>
                        <span className="font-medium">📞 Contact:</span> {user.contact}
                      </p>
                      <FaRegCopy
                        className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(user.contact) && confirm("Contact copied to clipboard") }
                        title="Copy Contact "
                        />
                    </div>
                  </div>

           </div>
                  <div className='flex flex-col italic text-md  items-center justify-center  mx-10   '>
                   <p className=' text-lg font-semibold text-gray-600  '>
                    About Me:
                   </p>
                    <br />
                   {user.bio && (
                     <p className="text-md italic flex  text-center items-center justify-center  flex-wrap hover:text-black -mt-4 text-gray-700"> <br />{user.bio}</p>
                    )}
                  </div>

                </div>

                
                <div className="flex flex-col gap-2 min-w-[160px]">
                  <button className= {` px-3 py-2 scale-90 hover:scale-[0.94] italic items-center text-center flex flex-row gap-2 justify-center  ${buttonStyleTwo}  rounded-lg  text-md `}> <FaUserAlt/> View Profile</button>
                  <button className= {` px-3 py-2 scale-90 hover:scale-[0.94] italic items-center text-center flex flex-row gap-2 justify-center  ${buttonStyleTwo}  rounded-lg  text-md `}> <FaPhone/> Contact</button>
                  <button className= {` px-3 py-2 scale-90 hover:scale-[0.94] italic items-center text-center flex flex-row gap-2 justify-center  ${buttonStyleTwo}  rounded-lg  text-md `}> <FaThumbsUp/> Favorite</button>
                  <button className= {` px-3 py-2 scale-90 hover:scale-[0.94] italic items-center text-center flex flex-row gap-2 justify-center   ${buttonStyleTwo}  rounded-lg  text-md `}><FaFlag /> Report</button>
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
