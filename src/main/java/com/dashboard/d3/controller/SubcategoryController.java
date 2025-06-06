package com.dashboard.d3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dashboard.d3.model.Subcategory;
import com.dashboard.d3.service.SubcategoryService;

@RestController
@RequestMapping("/api/subcategories")
public class SubcategoryController {
    @Autowired
    private SubcategoryService subcategoryService;

    @GetMapping
    public List<Subcategory> getAllSubcategories() {
        return subcategoryService.getAllSubcategories();
    }

    @GetMapping("/{id}")
    public Subcategory getSubcategoryById(@PathVariable Long id) {
        return subcategoryService.getSubcategoryById(id);
    }

    @PostMapping
    public Subcategory addSubcategory(@RequestBody Subcategory subcategory) {
        return subcategoryService.addSubcategory(subcategory);
    }

    @PutMapping("/{id}")
    public Subcategory updateSubcategory(@PathVariable Long id, @RequestBody Subcategory subcategoryDetails) {
        return subcategoryService.updateSubcategory(id, subcategoryDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteSubcategory(@PathVariable Long id) {
        subcategoryService.deleteSubcategory(id);
    }
}
