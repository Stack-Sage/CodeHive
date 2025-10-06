'use client'
import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const ThreadMessages = React.memo(function ThreadMessages({ activePeer, currentUser, messages, onDelete }) {
  const endRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages?.length]);

  if (!activePeer) return null;

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("ThreadMessages: messages", messages);
  }

  return (
    <div>
      {(messages || []).map((message) => (
        <MessageBubble
          key={message._id}
          msg={message}
          currentUserId={currentUser?._id}
          onDelete={onDelete}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
});

export default ThreadMessages;
