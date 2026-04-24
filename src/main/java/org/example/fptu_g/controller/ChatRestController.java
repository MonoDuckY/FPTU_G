package org.example.fptu_g.controller;

import org.example.fptu_g.model.ChatMessage;
import org.example.fptu_g.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*") // Cho phép React gọi API
public class ChatRestController {

    @Autowired
    private ChatService chatService;

    // Frontend gọi GET /api/chat/history/1 để lấy tin nhắn phòng 1
    @GetMapping("/history/{roomId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable Long roomId) {
        return ResponseEntity.ok(chatService.getHistoryByRoomId(roomId));
    }
}