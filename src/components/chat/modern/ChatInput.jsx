'use client'
import React, { useState, useRef } from 'react';
import { FaPaperclip, FaSmile, FaPaperPlane } from 'react-icons/fa';

export default function ChatInput({ onSendMessage, isSending, disabled }) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isSending || disabled) return;

    try {
      await onSendMessage({ text: trimmedMessage });
      setMessage('');
      setIsTyping(false);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setIsTyping(value.length > 0);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would typically upload the file and then send the message
    // For now, just log it
    console.log('File selected:', file);
    
    // Reset file input
    e.target.value = '';
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Typing Indicator */}
      {isTyping && (
        <div className="px-4 py-2 text-xs text-gray-500">
          Typing...
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-3 p-4">
        {/* Attachment Button */}
        <button
          onClick={openFileDialog}
          disabled={disabled || isSending}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPaperclip className="w-5 h-5" />
        </button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? 'Select a conversation to start messaging...' : 'Type a message...'}
            disabled={disabled || isSending}
            className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-2xl border-none outline-none resize-none transition-colors focus:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '44px', maxHeight: '120px' }}
            rows={1}
          />
          
          {/* Emoji Button */}
          <button
            disabled={disabled || isSending}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <FaSmile className="w-5 h-5" />
          </button>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled || isSending}
          className="flex-shrink-0 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
        >
          <FaPaperPlane className="w-4 h-4" />
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          className="hidden"
        />
      </div>
    </div>
  );
}
