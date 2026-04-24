import { useState } from 'react'
import ChatRoom from './pages/ChatRoom'

const USERS = [
  { id: 1, name: 'Mashiriko Murasaki' },
  { id: 2, name: 'Hảo Duck' },
  { id: 3, name: 'Đỗ Đăng Bình' }
];

const ROOMS = [
  { id: 1, name: 'Mashiriko & Hảo Duck (Cá nhân)' },
  { id: 2, name: 'Nhóm Đồ Án FPTU_G (Group)' }
];

function App() {
  const [currentUserId, setCurrentUserId] = useState(1);
  const [currentRoomId, setCurrentRoomId] = useState(1);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans text-sm md:text-base">
      {/* Sidebar chọn User và Room */}
      <div className="w-72 bg-white border-r shadow-2xl flex flex-col z-20">
        <div className="p-5 bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-md">
          <h1 className="font-bold text-xl tracking-tight">Trình test Chat</h1>
          <p className="text-blue-200 text-xs mt-1">Chuyển đổi User nhanh chóng</p>
        </div>

        <div className="p-5 flex-1 overflow-y-auto">
          <h2 className="font-bold text-gray-500 mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Đóng vai (Login)
          </h2>
          <div className="flex flex-col gap-2 mb-8">
            {USERS.map(user => (
              <button
                key={user.id}
                onClick={() => setCurrentUserId(user.id)}
                className={`p-3 rounded-xl text-left transition-all duration-200 ${currentUserId === user.id ? 'bg-blue-50 border-blue-500 border-l-4 text-blue-700 font-bold shadow-sm' : 'hover:bg-gray-50 text-gray-700 hover:pl-4 border-transparent border-l-4'}`}
              >
                {user.name}
              </button>
            ))}
          </div>

          <h2 className="font-bold text-gray-500 mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Phòng Chat
          </h2>
          <div className="flex flex-col gap-2">
            {ROOMS.map(room => (
              <button
                key={room.id}
                onClick={() => setCurrentRoomId(room.id)}
                className={`p-3 rounded-xl text-left transition-all duration-200 ${currentRoomId === room.id ? 'bg-green-50 border-green-500 border-l-4 text-green-700 font-bold shadow-sm' : 'hover:bg-gray-50 text-gray-700 hover:pl-4 border-transparent border-l-4'}`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 bg-yellow-50 border-t border-yellow-100 text-sm text-yellow-800 leading-relaxed shadow-inner">
          <strong className="block mb-1">💡 Mẹo test Real-time:</strong>
          Hãy mở một tab khác của trình duyệt (hoặc mở ẩn danh), chọn <strong>User khác</strong> rồi thử nhắn tin qua lại xem tin nhắn nhảy ngay lập tức nhé!
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative h-screen w-full bg-gray-200">
        <ChatRoom roomId={currentRoomId} currentUserId={currentUserId} />
      </div>
    </div>
  )
}

export default App
