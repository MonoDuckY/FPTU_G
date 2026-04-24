package org.example.fptu_g.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessageDTO {
    private Long id;
    private Long roomId;
    private Long senderId;
    private String content;
    private String senderName; // Gửi kèm tên để Frontend đỡ phải gọi API hỏi lại
    private LocalDateTime timestamp;
}