package com.dashboard.d3.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dashboard.d3.model.Subcategory;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
}
