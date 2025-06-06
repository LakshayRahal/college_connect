package com.dashboard.d3.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
@Data
public class PostDTO {

    private List<String> titles;
    private List<String> contents;
    private List<String> categories;
    private List<String> subcategories;
    private List<MultipartFile> photos;

    // Getters and Setters

    public List<String> getTitles() {
        return titles;
    }

    public void setTitles(List<String> titles) {
        this.titles = titles;
    }

    public List<String> getContents() {
        return contents;
    }

    public void setContents(List<String> contents) {
        this.contents = contents;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<String> getSubcategories() {
        return subcategories;
    }

    public void setSubcategories(List<String> subcategories) {
        this.subcategories = subcategories;
    }

    public List<MultipartFile> getPhotos() {
        return photos;
    }

    public void setPhotos(List<MultipartFile> photos) {
        this.photos = photos;
    }
}
