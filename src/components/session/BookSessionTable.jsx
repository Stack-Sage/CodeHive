import React from "react";

export default function BookSessionTable({
  sessions,
  user,
  showPayment,
  handlePayment,
  handleCancel,
  handleTeacherAccept,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-slate-300 rounded-xl bg-white text-sm sm:text-base">
        <thead className="hidden sm:table-header-group">
          <tr>
            <th className="px-2 py-2">Teacher</th>
            <th className="px-2 py-2">Student</th>
            <th className="px-2 py-2">Topic</th>
            <th className="px-2 py-2">Skill</th>
            <th className="px-2 py-2">Rate</th>
            <th className="px-2 py-2">Status</th>
            <th className="px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr
              key={s._id}
              className="border-b border-slate-200 sm:table-row block sm:table-row mb-4 sm:mb-0 bg-white rounded-lg sm:rounded-none shadow-sm sm:shadow-none"
            >
              <td className="px-2 py-2 sm:table-cell block">
                <span className="font-semibold sm:hidden">Teacher: </span>
                {s.teacher?.fullname || "—"}
              </td>
              <td className="px-2 py-2 sm:table-cell block">
                <span className="font-semibold sm:hidden">Student: </span>
                {s.student?.fullname || "—"}
              </td>
              <td className="px-2 py-2 sm:table-cell block">
                <span className="font-semibold sm:hidden">Topic: </span>
                {s.topic}
              </td>
              <td className="px-2 py-2 sm:table-cell block">
                <span className="font-semibold sm:hidden">Skill: </span>
                {s.skill}
              </td>
              <td className="px-2 py-2 sm:table-cell block">
                <span className="font-semibold sm:hidden">Rate: </span>
                ₹{s.proposedRate}
              </td>
              <td className="px-2 py-2 sm:table-cell block">
                <span className="font-semibold sm:hidden">Status: </span>
                {s.status}
              </td>
              <td className="px-2 py-2 sm:table-cell block">
                {/* Student actions */}
                {s.student && (s.student._id === user._id || s.student === user._id) && (
                  <>
                    {s.status === "accepted" && (
                      <div className="mb-2">
                        <div className="mb-1 text-xs text-gray-600">
                          <b>Teacher Payment Info:</b>
                          <div>
                            {s.teacherPaymentMethod?.upi && <div>UPI: <span className="font-mono">{s.teacherPaymentMethod.upi}</span></div>}
                            {s.teacherPaymentMethod?.bank && <div>Bank: <span className="font-mono">{s.teacherPaymentMethod.bank}</span></div>}
                            {s.teacherPaymentMethod?.mobile && <div>Mobile: <span className="font-mono">{s.teacherPaymentMethod.mobile}</span></div>}
                          </div>
                        </div>
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full sm:w-auto mb-2 sm:mb-0"
                          onClick={() => handlePayment(s)}
                          disabled={showPayment === s._id}
                        >
                          {showPayment === s._id ? "Processing..." : "Pay Now"}
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded w-full sm:w-auto mt-2"
                          onClick={() => handleCancel(s)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {s.status === "pending" && (
                      <>
                        <span className="text-yellow-600 block sm:inline">
                          Waiting for acceptance
                        </span>
                        <button
                          className="ml-0 sm:ml-2 mt-2 sm:mt-0 bg-red-500 text-white px-2 py-1 rounded w-full sm:w-auto"
                          onClick={() => handleCancel(s)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {s.status === "paid" && (
                      <span className="text-green-600">Paid</span>
                    )}
                    {s.status === "rejected" && (
                      <span className="text-red-600">Rejected</span>
                    )}
                  </>
                )}
                {/* Teacher actions */}
                {s.teacher && (s.teacher._id === user._id || s.teacher === user._id) && (
                  <>
                    {s.status === "pending" && (
                      <div className="flex flex-col gap-2">
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full sm:w-auto"
                          onClick={() => handleTeacherAccept(s)}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 w-full sm:w-auto"
                          onClick={() => handleCancel(s)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {s.status === "accepted" && (
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 w-full sm:w-auto mt-2"
                        onClick={() => handleCancel(s)}
                      >
                        Cancel
                      </button>
                    )}
                    {s.status === "paid" && (
                      <span className="text-green-600">Paid</span>
                    )}
                    {s.status === "rejected" && (
                      <span className="text-red-600">Rejected</span>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
