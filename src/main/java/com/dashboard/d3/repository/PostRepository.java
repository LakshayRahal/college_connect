package com.dashboard.d3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dashboard.d3.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Custom queries can be added here if needed
}
