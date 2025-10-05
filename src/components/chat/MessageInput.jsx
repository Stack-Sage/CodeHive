'use client'
import React, { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = async () => {
    const t = text.trim();
    if (!t) return;
    await onSend(t);
    setText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white p-3 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message"
        className="flex-1 h-10 px-3 rounded-md border outline-none"
      />
      <button
        onClick={handleSend}
        className="h-10 px-4 rounded-md bg-emerald-600 text-white disabled:opacity-50"
        disabled={!text.trim()}
      >
        Send
      </button>
    </div>
  );
}
