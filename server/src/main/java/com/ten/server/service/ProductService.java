package com.ten.server.service;

import com.ten.server.dto.ProductDTO;
import com.ten.server.entity.Category;
import com.ten.server.entity.Product;
import com.ten.server.repositories.CategoryRepository;
import com.ten.server.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public Product createProduct(ProductDTO product) {
        Category category = categoryRepository.findByName(product.getCategory());
        Product product1 = new Product(
                product.getName(),
                product.getPrice(),
                product.getUrlToPhoto(),
                category
        );
        return productRepository.save(product1);
    }

    public List<Product> getAllProductsById(Long id) {
        return productRepository.findProductsByCategory_Id(id);
    }

    public void updateProduct(ProductDTO product) {
        Category category = categoryRepository.findByName(product.getCategory());
        Product product1 = new Product(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getUrlToPhoto(),
                category
        );
        productRepository.save(product1);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
