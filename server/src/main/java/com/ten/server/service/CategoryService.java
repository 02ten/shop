package com.ten.server.service;

import com.ten.server.entity.Category;
import com.ten.server.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepo;

    public Category createCategory(Category category){
        return categoryRepo.save(new Category(category.getName()));
    }

    public Category findCategoryByName(String name){
        return categoryRepo.findByName(name);
    }
    public void updateCategory(Category category){
        categoryRepo.save(category);
    }
    public void deleteCategory(Long id){
        categoryRepo.deleteById(id);
    }

    public List<Category> getAllCategories(){
        return categoryRepo.findAll();
    }
}
