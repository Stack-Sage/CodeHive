'use client'
import React from "react";

export default function ThreadChips({
  showNew = false,
  onClickNew,
  showJump = false,
  onClickJump,
}) {
  return (
    <>
      {showNew && (
        <button
          onClick={onClickNew}
          className="fixed sm:absolute left-1/2 -translate-x-1/2 bottom-24 sm:bottom-16 z-20 bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-full shadow hover:bg-emerald-700 transition"
        >
          New messages
        </button>
      )}
      {showJump && (
        <button
          onClick={onClickJump}
          className="fixed sm:absolute right-4 bottom-24 sm:bottom-16 z-20 bg-white border text-gray-700 text-xs px-3 py-1.5 rounded-full shadow hover:bg-gray-50 transition"
          title="Jump to bottom"
        >
          ↓ Bottom
        </button>
      )}
    </>
  );
}
