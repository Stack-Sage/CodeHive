'use client'
import React, { useEffect, useRef } from 'react';
import { useChat } from '@/context/chat.context';
import { useGlobalContext } from '@/context/global.context';
import MessageBubble from './modern/MessageBubble';
import { deleteMessageApi } from '@/services/chat.service';
import { showSuccess, showError } from '@/ui/toast';
import { FaTrashAlt } from 'react-icons/fa';

export default function ThreadMessages({ activePeer, currentUser }) {
  const { messages, reloadThread, activePeerId } = useChat();
  const { user } = useGlobalContext();
  const endRef = useRef(null);

  // Ensure thread is loaded when component mounts for the active peer
  useEffect(() => {
    if (reloadThread && activePeerId) {
      reloadThread().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePeerId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages?.length]);

  const handleDelete = async (id) => {
    try {
      await deleteMessageApi(id);
      showSuccess('Message deleted');
      if (reloadThread) await reloadThread();
    } catch (err) {
      showError('Failed to delete message');
    }
  };

  if (!activePeer) return null;

  return (
    <div>
      {(messages || []).map((message) => {
        const isMine = String(message.fromUser?._id || message.fromUser) === String(user?._id);
        const meta = {
          isMine,
          senderName: isMine ? (user?.fullname || 'You') : (activePeer?.fullname || 'User'),
        };

        return (
          <div
            key={message._id}
            className={`flex items-start gap-3 ${isMine ? 'justify-end' : 'justify-start'} mb-3`}
          >
            <img
              src={isMine ? (user?.avatar || '/avatar.png') : (activePeer?.avatar || '/avatar.png')}
              alt={meta.senderName}
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />

            <div className="flex flex-col max-w-2xl w-full">
              <MessageBubble
                message={message}
                meta={meta}
                showAvatar={false}
                activePeer={activePeer}
                currentUser={user}
              />

              <div className="flex items-center gap-2 mt-1 ml-2 text-xs text-gray-500">
                <span>
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : ''}
                </span>
                <span>{meta.senderName}</span>
              </div>
            </div>

            {isMine && (
              <button
                onClick={() => handleDelete(message._id)}
                className="ml-2 text-red-500 hover:text-red-700 p-2 rounded-full bg-white shadow"
                title="Delete message"
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
