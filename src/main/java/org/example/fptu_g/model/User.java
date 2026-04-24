package org.example.fptu_g.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data // Tự động sinh Getter, Setter, toString... (Cần cài Lombok)
public class User {
    @Id
    private Long id; // Để khớp với ID trong data.sql

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "full_name")
    private String fullName;
}