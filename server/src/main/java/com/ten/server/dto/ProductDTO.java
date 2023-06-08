package com.ten.server.dto;

import com.ten.server.entity.Category;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class ProductDTO {
    private Long id;
    private String name;
    private double price;
    private String urlToPhoto;
    private String category;
}
