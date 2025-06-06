package com.dashboard.d3.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dashboard.d3.model.Post;
import com.dashboard.d3.service.PostService;

@CrossOrigin(origins = {"http://127.0.0.1:5501", "http://localhost:5501"})
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    private final PostService postService;

    @Value("${upload.dir}")
    private String uploadDir;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<Post> uploadPost(@RequestParam("photo") MultipartFile photo,
                                           @RequestParam("title") String title,
                                           @RequestParam("content") String content,
                                           @RequestParam("category") String category,
                                           @RequestParam("subcategory") String subcategory) {
        logger.info("Received request to upload a post");

        // Validate input
        if (title == null || content == null || category == null || subcategory == null || photo.isEmpty()) {
            logger.warn("Invalid request received: Some fields are empty or null");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            String fileName = Objects.requireNonNull(photo.getOriginalFilename());
            Path filePath = Paths.get(uploadDir, fileName);

            // Save file
            Files.copy(photo.getInputStream(), filePath);

            // Create Post object
            Post post = new Post(title, content, category, subcategory, fileName);

            // Save Post object
            Post savedPost = postService.addPost(post);

            logger.info("Post uploaded successfully");
            return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
        } catch (IOException e) {
            logger.error("Error saving uploaded file: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
