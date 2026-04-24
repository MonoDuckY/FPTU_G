package org.example.fptu_g.controller;

import org.example.fptu_g.dto.ChatMessageDTO;
import org.example.fptu_g.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    @Autowired
    private ChatService chatService;

    // Frontend sẽ gửi tin nhắn đến đích: /app/chat.sendMessage/{roomId}
    @MessageMapping("/chat.sendMessage/{roomId}")
    // Server sẽ Broadcast (phát sóng) tin nhắn tới tất cả những ai đang theo dõi kênh: /topic/room/{roomId}
    @SendTo("/topic/room/{roomId}")
    public ChatMessageDTO broadcastMessage(@DestinationVariable("roomId") Long roomId, @Payload ChatMessageDTO messageDTO) {
        // 1. Lưu tin nhắn xuống Database (MySQL)
        ChatMessageDTO savedMessage = chatService.saveMessage(messageDTO);

        // 2. Tự động đẩy tin nhắn đã lưu (có kèm thời gian thực) sang cho mọi người trong phòng
        return savedMessage;
    }
}