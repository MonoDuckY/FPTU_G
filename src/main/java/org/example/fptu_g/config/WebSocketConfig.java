package org.example.fptu_g.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Frontend sẽ gọi đến link "ws://localhost:8080/ws" để bắt đầu kết nối
        // setAllowedOrigins("*") để cho phép React (cổng 5173) truy cập không bị lỗi CORS
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Tiền tố cho các phòng chat (ví dụ: Frontend lắng nghe ở /topic/room/1)
        registry.enableSimpleBroker("/topic");

        // Tiền tố khi Frontend muốn gửi tin nhắn LÊN server (ví dụ: /app/chat.send)
        registry.setApplicationDestinationPrefixes("/app");
    }
}