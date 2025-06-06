package com.dashboard.d3.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dashboard.d3.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
