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
    <div className="flex h-full w-full bg-rose-50 text-gray-800 font-sans">

      {/* CỘT TRÁI: Khu vực Chat Chính */}
      <div className="flex-1 flex flex-col relative shadow-lg bg-white/50 backdrop-blur-sm border-r border-rose-100">

        {/* Header Chat */}
        <div className="bg-white/90 backdrop-blur-md p-4 border-b border-rose-100 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white shadow-md font-bold">
              {roomId}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 text-lg">Phòng Chat {roomId}</span>
              <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Đang hoạt động
              </span>
            </div>
          </div>

          <div className="flex gap-1 text-rose-500 text-lg">
            {/* Fake icon buttons */}
            <button className="w-10 h-10 flex items-center justify-center hover:bg-rose-100 rounded-full transition-colors">📞</button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-rose-100 rounded-full transition-colors">📹</button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-rose-100 rounded-full transition-colors">ℹ️</button>
          </div>
        </div>

        {/* Khu vực hiển thị tin nhắn */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
          {messages.map((msg, index) => {
            const isMe = msg.sender?.id === currentUserId || msg.senderId === currentUserId;
            const timeString = msg.timestamp ? format(new Date(msg.timestamp), 'HH:mm dd/MM') : '';

            return (
              <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                {/* Tên người gửi (chỉ hiện nếu là người khác) */}
                {!isMe && <span className="text-xs text-gray-400 mb-1 ml-2 font-medium">{msg.sender?.fullName || msg.senderName}</span>}

                <div className={`px-5 py-3 max-w-[70%] shadow-sm ${isMe
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-3xl rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-3xl rounded-bl-sm border border-rose-100'
                  }`}>
                  {msg.content}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 mx-2">{timeString}</span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Khu vực nhập tin nhắn */}
        <div className="p-4 bg-white/90 backdrop-blur-md border-t border-rose-100 sticky bottom-0">
          <form onSubmit={handleSend} className="flex gap-2 items-center">
            <button type="button" className="text-rose-500 hover:bg-rose-100 w-10 h-10 flex items-center justify-center rounded-full transition-colors text-xl">
              ➕
            </button>
            <button type="button" className="text-rose-500 hover:bg-rose-100 w-10 h-10 flex items-center justify-center rounded-full transition-colors text-xl">
              🖼️
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border border-rose-200 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-rose-50 focus:bg-white transition-all text-sm shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all shadow-md active:scale-95 text-xl ${inputText.trim()
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
            >
              🚀
            </button>
          </form>
        </div>
      </div>

      {/* CỘT PHẢI: Thanh thông tin (Right Sidebar giống Messenger) */}
      <div className="hidden lg:flex flex-col w-80 bg-white overflow-y-auto">
        <div className="flex flex-col items-center pt-8 pb-4 border-b border-rose-100">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-300 to-rose-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4 ring-4 ring-rose-50">
            {roomId}
          </div>
          <h2 className="text-lg font-bold text-gray-800">Phòng Chat {roomId}</h2>
          <p className="text-xs text-gray-500 mt-1">Đang nhập vai: User <span className="text-pink-500 font-bold">{currentUserId}</span></p>
        </div>

        <div className="flex flex-col p-2 gap-1 text-sm text-gray-700">
          <button className="flex items-center justify-between p-3 hover:bg-rose-50 rounded-xl transition-colors font-medium">
            <span>Thông tin về đoạn chat</span>
            <span className="text-rose-300 font-bold">⌄</span>
          </button>
          <button className="flex items-center justify-between p-3 hover:bg-rose-50 rounded-xl transition-colors font-medium">
            <span>Tùy chỉnh đoạn chat</span>
            <span className="text-rose-300 font-bold">⌄</span>
          </button>
          <button className="flex items-center justify-between p-3 hover:bg-rose-50 rounded-xl transition-colors font-medium">
            <span>File phương tiện & file</span>
            <span className="text-rose-300 font-bold">⌄</span>
          </button>
          <button className="flex items-center justify-between p-3 hover:bg-rose-50 rounded-xl transition-colors font-medium">
            <span>Quyền riêng tư và hỗ trợ</span>
            <span className="text-rose-300 font-bold">⌄</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChatRoom;