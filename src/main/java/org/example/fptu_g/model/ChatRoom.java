package org.example.fptu_g.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "chat_rooms")
@Data
public class ChatRoom {
    @Id
    private Long id;

    private String name;

    @Column(name = "is_group")
    private boolean isGroup;
}