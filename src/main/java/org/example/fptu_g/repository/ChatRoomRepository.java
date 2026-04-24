package org.example.fptu_g.repository;

import org.example.fptu_g.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    // Các hàm cơ bản như save(), findById(), delete() đã có sẵn hết rồi,
    // không cần viết thêm gì ở đây lúc này.
}