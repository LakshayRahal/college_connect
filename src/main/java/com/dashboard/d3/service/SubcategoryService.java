package com.dashboard.d3.service;
import com.dashboard.d3.model.Subcategory;
import com.dashboard.d3.repository.SubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubcategoryService {
    @Autowired
    private SubcategoryRepository subcategoryRepository;

    public List<Subcategory> getAllSubcategories() {
        return subcategoryRepository.findAll();
    }

    public Subcategory getSubcategoryById(Long id) {
        return subcategoryRepository.findById(id).orElse(null);
    }

    public Subcategory addSubcategory(Subcategory subcategory) {
        return subcategoryRepository.save(subcategory);
    }

    public Subcategory updateSubcategory(Long id, Subcategory subcategoryDetails) {
        Subcategory subcategory = subcategoryRepository.findById(id).orElse(null);
        if (subcategory != null) {
            subcategory.setName(subcategoryDetails.getName());
            subcategory.setCategory(subcategoryDetails.getCategory());
            return subcategoryRepository.save(subcategory);
        }
        return null;
    }

    public void deleteSubcategory(Long id) {
        subcategoryRepository.deleteById(id);
    }
}
