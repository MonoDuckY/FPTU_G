package org.example.fptu_g.repository;

import org.example.fptu_g.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}
