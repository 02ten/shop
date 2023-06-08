package com.ten.server.controller;

import com.ten.server.dto.ProductDTO;
import com.ten.server.entity.Category;
import com.ten.server.entity.Product;
import com.ten.server.service.CategoryService;
import com.ten.server.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    private final ProductService productService;
    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }
    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable Long id){
        return ResponseEntity.ok(productService.getAllProductsById(id));
    }
    @PostMapping("/admin/products")
    public ResponseEntity<?> addCategory(@RequestBody ProductDTO product){
        return ResponseEntity.ok(productService.createProduct(product));

    }
    @PutMapping("/admin/products")
    public ResponseEntity<?> updateCategory(@RequestBody ProductDTO product){
        productService.updateProduct(product);
        System.out.println(product.getId());
        return ResponseEntity.ok("200");

    }
    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        System.out.println(id);
        productService.deleteProduct(id);
        return ResponseEntity.ok("200");

    }
}
