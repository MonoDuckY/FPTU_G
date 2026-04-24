import { create } from 'zustand';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

const useChatStore = create((set, get) => ({
  messages: [],
  isConnected: false,
  stompClient: null,

  // 1. Lấy lịch sử chat bằng HTTP (Axios)
  fetchHistory: async (roomId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/chat/history/${roomId}`);
      set({ messages: response.data });
    } catch (error) {
      console.error("Lỗi tải lịch sử:", error);
    }
  },

  // 2. Kết nối WebSocket & Lắng nghe tin nhắn mới
  connectWebSocket: (roomId) => {
    const { stompClient } = get();
    if (stompClient) {
      stompClient.deactivate(); // Đảm bảo ngắt kết nối cũ nếu có
    }

    // Dùng SockJS để tương thích với cấu hình .withSockJS() của Spring Boot
    const socket = new SockJS('http://localhost:8080/ws'); 
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        set({ isConnected: true });
        
        // Theo dõi (Subscribe) phòng chat
        client.subscribe(`/topic/room/${roomId}`, (messageOutput) => {
          const newMessage = JSON.parse(messageOutput.body);
          // Chống trùng lặp tin nhắn (đặc biệt khi React 18 Strict Mode chạy useEffect 2 lần)
          set((state) => {
            const isDuplicate = state.messages.some(msg => msg.id === newMessage.id);
            if (isDuplicate) return state;
            return { messages: [...state.messages, newMessage] };
          });
        });
      },
      onDisconnect: () => {
        set({ isConnected: false });
      }
    });
    
    set({ stompClient: client }); // Gán ngay client vào state để khi unmount có thể deactivate kịp thời
    client.activate(); // Bắt đầu kết nối
  },

  // 3. Gửi tin nhắn mới lên Server
  sendMessage: (roomId, senderId, content) => {
    const { stompClient, isConnected } = get();
    if (stompClient && isConnected && content.trim() !== "") {
      const chatMessage = {
        roomId: roomId,
        senderId: senderId,
        content: content
      };
      // Bắn JSON lên đường ống của Server
      stompClient.publish({
        destination: `/app/chat.sendMessage/${roomId}`,
        body: JSON.stringify(chatMessage)
      });
    }
  },

  // 4. Ngắt kết nối khi rời phòng
  disconnectWebSocket: () => {
    const { stompClient } = get();
    if (stompClient) {
      stompClient.deactivate();
    }
  }
}));

export default useChatStore;