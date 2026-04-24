package org.example.fptu_g.repository;

import org.example.fptu_g.model.ChatRoomMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {

    // Tìm tất cả các phòng mà một User (theo ID) đang tham gia
    // Thường dùng khi User vừa đăng nhập xong và mở danh sách chat
    List<ChatRoomMember> findByUserId(Long userId);

    // Tìm tất cả thành viên trong một Phòng chat (theo ID phòng)
    // Dùng để biết phải gửi thông báo/tin nhắn cho những ai
    List<ChatRoomMember> findByRoomId(Long roomId);

    // Kiểm tra xem User có thuộc Phòng này không
    boolean existsByRoomIdAndUserId(Long roomId, Long userId);
}