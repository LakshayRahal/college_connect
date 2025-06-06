package com.dashboard.d3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dashboard.d3.model.Post;
import com.dashboard.d3.repository.PostRepository;

import lombok.Data;
@Data
@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Transactional
    public Post addPost(Post post) {
        // Ensure that the post object is not null and all required fields are set
        if (post == null || post.getTitle() == null || post.getContent() == null || 
            post.getCategory() == null || post.getSubcategory() == null || post.getPhoto() == null) {
            throw new IllegalArgumentException("Post or required fields are null");
        }
        return postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    @Transactional
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
