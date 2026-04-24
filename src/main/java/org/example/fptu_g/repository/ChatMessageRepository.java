package org.example.fptu_g.repository;

import org.example.fptu_g.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    // Tìm tất cả tin nhắn của một phòng chat, VÀ sắp xếp theo thời gian cũ đến mới
    // Hàm này cực kỳ lợi hại, nó dịch ra SQL:
    // SELECT * FROM chat_messages WHERE room_id = ? ORDER BY timestamp ASC
    List<ChatMessage> findByRoomIdOrderByTimestampAsc(Long roomId);
}