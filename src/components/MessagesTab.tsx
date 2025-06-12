import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Headphones } from 'lucide-react';
import { AppState } from '../types';

interface MessagesTabProps {
  state: AppState;
  onSendMessage: (message: string) => void;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({ state, onSendMessage }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [activeSection, setActiveSection] = useState<'service' | 'feedback'>('service');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      onSendMessage(currentMessage.trim());
      setCurrentMessage('');
    }
  };

  return (
    <div className="p-6 space-y-6 h-full flex flex-col">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Messages</h2>
        <p className="text-gray-400">Customer support and feedback</p>
      </div>

      {/* Section Tabs */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20">
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => setActiveSection('service')}
            className={`py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
              activeSection === 'service'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Headphones className="w-4 h-4 mr-2" />
            Customer Service
          </button>
          <button
            onClick={() => setActiveSection('feedback')}
            className={`py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
              activeSection === 'feedback'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Feedback
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-80">
          {state.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white/20 text-white border border-white/20'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-purple-100' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/20">
          <form onSubmit={handleSend} className="flex space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              disabled={!currentMessage.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};