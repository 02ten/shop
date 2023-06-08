package com.ten.server.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Table(name="t_product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="name")
    private String name;
    @Column(name="price")
    private double price;
    @Column(name="urlToPhoto", columnDefinition="TEXT")
    private String urlToPhoto;
    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    public Product(String name, double price, String urlToPhoto, Category category) {
        this.name = name;
        this.price = price;
        this.urlToPhoto = urlToPhoto;
        this.category = category;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getUrlToPhoto() {
        return urlToPhoto;
    }

    public void setUrlToPhoto(String urlToPhoto) {
        this.urlToPhoto = urlToPhoto;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
