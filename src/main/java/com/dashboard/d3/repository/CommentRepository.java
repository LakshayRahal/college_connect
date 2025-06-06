package com.dashboard.d3.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dashboard.d3.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
