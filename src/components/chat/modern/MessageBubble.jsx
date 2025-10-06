'use client'
import React, { useState } from 'react';
import { FaCheck, FaClock } from 'react-icons/fa';

export default function MessageBubble({ message, meta, showAvatar, activePeer, currentUser }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const renderMessageStatus = () => {
    if (!meta.isMine) return null;
    if (message.__optimistic) {
      return <FaClock className="w-3 h-3 text-gray-400" />;
    }
    if (message.__failed) {
      return <span className="text-red-500 text-xs">Failed</span>;
    }
    return <FaCheck className="w-3 h-3 text-blue-500" />;
  };

  const renderAttachment = () => {
    if (!message.fileUrl) return null;

    const isImage = message.fileType?.startsWith('image') || 
                   message.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);

    if (isImage) {
      return (
        <div className="relative max-w-xs rounded-lg overflow-hidden">
          {!imageLoaded && (
            <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400 text-sm">Loading...</span>
            </div>
          )}
          <img
            src={message.fileUrl}
            alt="Shared image"
            className={`w-full max-w-xs rounded-lg cursor-pointer transition-opacity ${
              imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
            }`}
            onLoad={() => setImageLoaded(true)}
            onClick={() => window.open(message.fileUrl, '_blank')}
          />
        </div>
      );
    }

    return (
      <a
        href={message.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors
          ${meta.isMine 
            ? 'border-blue-300 text-blue-100 hover:border-blue-200' 
            : 'border-gray-300 text-gray-700 hover:border-gray-400 bg-white'
          }
        `}
      >
        <span>📎</span>
        <span className="text-sm">View attachment</span>
      </a>
    );
  };

  return (
    <div className={`flex gap-2 ${meta.isMine ? 'justify-end' : 'justify-start'} group`}>
      {/* Avatar (for received messages) */}
      {!meta.isMine && (
        <div className="w-8 h-8 flex-shrink-0">
          {showAvatar ? (
            <img
              src={activePeer?.avatar || '/avatar.png'}
              alt={meta.senderName}
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-8 h-8" />
          )}
        </div>
      )}

      {/* Message Bubble */}
      <div className={`
        max-w-xl w-full flex flex-col
        ${meta.isMine ? 'items-end' : 'items-start'}
      `}>
        {/* Sender name (for group chats) */}
        {!meta.isMine && showAvatar && (
          <span className="text-xs text-gray-500 mb-1 px-3">
            {meta.senderName}
          </span>
        )}

        {/* Message Content */}
        <div className={`
          relative px-5 py-3 rounded-2xl max-w-full break-words
          ${meta.isMine 
            ? 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white rounded-br-md' 
            : 'bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-200 text-gray-900 rounded-bl-md shadow-sm'
          }
          ${message.__failed ? 'opacity-70' : ''}
        `}>
          {/* Text Message */}
          {message.message && (
            <p className="text-base leading-relaxed whitespace-pre-wrap">
              {message.message}
            </p>
          )}

          {/* Attachment */}
          {message.fileUrl && (
            <div className={message.message ? 'mt-2' : ''}>
              {renderAttachment()}
            </div>
          )}

          {/* Time and Status */}
          <div className={`
            flex items-center gap-1 mt-2 text-xs
            ${meta.isMine ? 'text-blue-100' : 'text-gray-500'}
            ${!message.message && !message.fileUrl ? 'mt-0' : ''}
          `}>
            <span>{formatTime(message.createdAt)}</span>
            {renderMessageStatus()}
          </div>
        </div>
      </div>
    </div>
  );
}