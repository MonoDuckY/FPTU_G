import React, { useEffect, useState, useRef } from 'react';
import useChatStore from '../store/chatStore';
import { format } from 'date-fns';

const ChatRoom = ({ roomId, currentUserId }) => {
  const { messages, fetchHistory, connectWebSocket, disconnectWebSocket, sendMessage } = useChatStore();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // Khi vào phòng mới: Tải lịch sử -> Kết nối Web Socket
  useEffect(() => {
    fetchHistory(roomId);
    connectWebSocket(roomId);

    // Khi đổi phòng hoặc rời trang (Unmount): Ngắt kết nối phòng cũ
    return () => disconnectWebSocket();
  }, [roomId, fetchHistory, connectWebSocket, disconnectWebSocket]);

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(roomId, currentUserId, inputText);
    setInputText(""); // Xóa trắng ô nhập
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative shadow-inner">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 font-bold shadow-md sticky top-0 z-10 flex items-center justify-between">
        <span>Phòng Chat {roomId}</span>
        <span className="text-xs font-normal bg-blue-700 px-2 py-1 rounded-full opacity-80">
          User ID hiện tại: {currentUserId}
        </span>
      </div>

      {/* Khu vực hiển thị tin nhắn */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
        {messages.map((msg, index) => {
          // Xác định tin nhắn có phải do mình gửi không
          const isMe = msg.sender?.id === currentUserId || msg.senderId === currentUserId;
          const timeString = msg.timestamp ? format(new Date(msg.timestamp), 'HH:mm dd/MM') : '';

          return (
            <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <span className="text-xs text-gray-500 mb-1">{msg.sender?.fullName || msg.senderName}</span>
              <div className={`px-4 py-2 rounded-2xl max-w-[75%] shadow-sm ${isMe ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white border rounded-bl-none'}`}>
                {msg.content}
              </div>
              <span className="text-xs text-gray-400 mt-1">{timeString}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} /> {/* Điểm neo để cuộn xuống */}
      </div>

      {/* Khu vực nhập tin nhắn */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2 sticky bottom-0 shadow-lg">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors"
        />
        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md active:scale-95">
          Gửi
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;