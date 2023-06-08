package com.ten.server.controller;

import com.ten.server.entity.Category;
import com.ten.server.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
    private final CategoryService categoryService;
    @GetMapping("/category")
    public ResponseEntity<?> getAllCategories(){
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
    @PostMapping("/admin/categories")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        System.out.println(category.toString());
        return ResponseEntity.ok(categoryService.createCategory(category));

    }
    @PutMapping("/admin/categories")
    public ResponseEntity<?> updateCategory(@RequestBody Category category){
        System.out.println(category.toString());
        categoryService.updateCategory(category);
        return ResponseEntity.ok("200");

    }
    @DeleteMapping("/admin/categories/{id}")
    public ResponseEntity<?> addCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("200");

    }
}
