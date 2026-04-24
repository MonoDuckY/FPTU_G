package org.example.fptu_g.service;

import org.example.fptu_g.dto.ChatMessageDTO;
import org.example.fptu_g.model.ChatMessage;
import org.example.fptu_g.model.ChatRoom;
import org.example.fptu_g.model.User;
import org.example.fptu_g.repository.ChatMessageRepository;
import org.example.fptu_g.repository.ChatRoomRepository;
import org.example.fptu_g.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChatRoomRepository roomRepository;
    @Autowired
    private org.example.fptu_g.repository.ChatRoomMemberRepository memberRepository;

    // Hàm 1: Lấy lịch sử chat của một phòng
    public List<ChatMessage> getHistoryByRoomId(Long roomId) {
        return messageRepository.findByRoomIdOrderByTimestampAsc(roomId);
    }

    // Hàm 2: Xử lý và lưu tin nhắn mới
    public ChatMessageDTO saveMessage(ChatMessageDTO dto) {
        // Kiểm tra bảo mật: Sender có phải là thành viên của Room không?
        if (!memberRepository.existsByRoomIdAndUserId(dto.getRoomId(), dto.getSenderId())) {
            throw new IllegalArgumentException(
                    "User " + dto.getSenderId() + " is not a member of room " + dto.getRoomId());
        }

        User sender = userRepository.findById(dto.getSenderId()).orElseThrow();
        ChatRoom room = roomRepository.findById(dto.getRoomId()).orElseThrow();

        ChatMessage message = new ChatMessage();
        message.setRoom(room);
        message.setSender(sender);
        message.setContent(dto.getContent());
        message.setTimestamp(LocalDateTime.now());

        // Lưu vào MySQL
        ChatMessage savedMsg = messageRepository.save(message);

        // Chuẩn bị DTO để trả về cho Frontend
        dto.setId(savedMsg.getId());
        dto.setTimestamp(savedMsg.getTimestamp());
        dto.setSenderName(sender.getFullName());
        return dto;
    }
}