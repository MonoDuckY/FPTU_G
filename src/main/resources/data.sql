-- Thêm dữ liệu mẫu cho bảng Users
INSERT IGNORE INTO users (id, username, full_name) VALUES
(1, 'mashi', 'Mashiriko Murasaki'),
(2, 'ducky', 'Hảo Duck'),
(3, 'zikky', 'Đỗ Đăng Bình');

-- Thêm dữ liệu mẫu cho bảng ChatRooms
INSERT IGNORE INTO chat_rooms (id, name, is_group) VALUES
(1, 'Mashiriko & Ducky', false),
(2, 'Nhóm Đồ Án FPTU_G', true);

-- Thêm dữ liệu mẫu cho bảng ChatRoomMembers (Ai ở phòng nào)
-- mashi và ducky ở Room 1
INSERT IGNORE INTO chat_room_members (id, room_id, user_id) VALUES
(1, 1, 1),
(2, 1, 2);

INSERT IGNORE INTO chat_room_members (id, room_id, user_id) VALUES
(3, 2, 1),
(4, 2, 2),
(5, 2, 3);

INSERT IGNORE INTO chat_messages (id, room_id, sender_id, content, timestamp) VALUES
(1, 1, 1, 'Chào Ducky, rảnh không code UI tiếp nhé?', '2026-04-23 08:00:00'),
(2, 1, 2, 'Ok Ducky, đợi mình xíu lên Discord.', '2026-04-23 08:05:00'),
(3, 2, 3, 'Mọi người ơi, chốt cấu trúc database xong chưa?', '2026-04-23 09:00:00'),
(4, 2, 1, 'Xong rồi Mashiriko nhé, PM duyệt rồi.', '2026-04-23 09:10:00');