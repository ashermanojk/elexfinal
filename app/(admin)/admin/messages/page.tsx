"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@/supabase/config';
import { format } from 'date-fns';
import { Message } from '@/types';
import { motion } from 'framer-motion';

// Extend the Message type to include reply fields
interface ExtendedMessage extends Omit<Message[0], 'id'> {
  id: string;
  replied?: boolean;
  replied_at?: string;
}

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<ExtendedMessage | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch messages on component mount
  useEffect(() => {
    async function fetchMessages() {
      const supabase = createClient();
      const { data } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setMessages(data as ExtendedMessage[]);
      }
      setIsLoading(false);
    }
    
    fetchMessages();
  }, []);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyContent.trim()) return;
    
    setIsReplying(true);
    
    try {
      // Send email and update message status in one API call
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: selectedMessage.email,
          subject: `RE: ${selectedMessage.subject}`,
          message: replyContent,
          messageId: selectedMessage.id // Pass message ID for database update
        }),
      });
      
      if (response.ok) {
        // Update local state
        setMessages(messages.map(msg => 
          msg.id === selectedMessage.id 
            ? { ...msg, replied: true, replied_at: new Date().toISOString() } 
            : msg
        ));
        
        // Reset form
        setReplyContent('');
        setSelectedMessage(null);
      } else {
        // Handle error response
        const error = await response.json();
        throw new Error(error.message || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Failed to send reply. Please try again.');
    } finally {
      setIsReplying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
        Contact Messages
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Messages List */}
        <div className="w-full lg:w-1/2 space-y-4">
          {messages.length === 0 ? (
            <div className="p-4 bg-slate-800 rounded-lg text-slate-400">
              No messages found.
            </div>
          ) : (
            messages.map((message) => (
              <motion.div 
                key={message.id}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className={`p-4 bg-slate-800 border rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedMessage?.id === message.id 
                    ? 'border-orange-400 shadow-lg' 
                    : 'border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-slate-200">{message.name}</h3>
                    <p className="text-sm text-slate-400">{message.email}</p>
                  </div>
                  <span className="text-sm text-slate-500">
                    {format(new Date(message.created_at), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="font-medium text-slate-300">{message.subject}</p>
                  <p className="text-slate-400 line-clamp-2">{message.message}</p>
                </div>
                {message.replied && (
                  <div className="mt-2 text-xs text-orange-400">
                    Replied {message.replied_at && format(new Date(message.replied_at), 'MMM dd, yyyy')}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Reply Section */}
        <div className="w-full lg:w-1/2">
          {selectedMessage ? (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 h-full flex flex-col">
              <div className="mb-4 pb-4 border-b border-slate-700">
                <h3 className="text-xl font-semibold text-slate-200">{selectedMessage.subject}</h3>
                <div className="flex justify-between text-sm text-slate-400 mt-1">
                  <div>From: {selectedMessage.name} ({selectedMessage.email})</div>
                  <div>{format(new Date(selectedMessage.created_at), 'MMM dd, yyyy HH:mm')}</div>
                </div>
                <div className="mt-4 text-slate-300 whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              
              <form onSubmit={handleReply} className="flex-1 flex flex-col">
                <h4 className="font-medium text-slate-300 mb-2">Reply</h4>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Type your reply here..."
                  className="w-full h-40 p-3 bg-slate-900 border border-slate-700 rounded-md text-slate-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none resize-none flex-1"
                  required
                />
                <div className="flex justify-end mt-4 space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMessage(null)}
                    className="px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isReplying}
                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-md text-white disabled:opacity-50 hover:shadow-lg transition-all"
                  >
                    {isReplying ? 'Sending...' : 'Send Reply'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400">Select a message to reply</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 