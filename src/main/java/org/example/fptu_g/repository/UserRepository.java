package org.example.fptu_g.repository;

import org.example.fptu_g.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Boot tự động hiểu hàm này tương đương với:
    // SELECT * FROM users WHERE username = ?
    Optional<User> findByUsername(String username);
}