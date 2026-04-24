package org.example.fptu_g.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "chat_room_members")
@Data
public class ChatRoomMember {
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom room;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}