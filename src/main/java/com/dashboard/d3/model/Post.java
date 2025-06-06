package com.dashboard.d3.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String subcategory;

    @Column(nullable = false)
    private String photo; // Store the file path (relative or absolute)

    // Constructors

    public Post() {
        // Default constructor
    }

    public Post(String title, String content, String category, String subcategory, String photo) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.subcategory = subcategory;
        this.photo = photo;
    }

    // Getters and Setters (omitted for brevity)

    // toString() method (Optional for debugging)

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", category='" + category + '\'' +
                ", subcategory='" + subcategory + '\'' +
                ", photo='" + photo + '\'' +
                '}';
    }
}
