package com.eshop.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.eshop.app.dto.ProductDTO;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "Products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String description;
    private String imagePath;
    private double price;
    private int stock;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Review> reviews;


    public Product(ProductDTO product){
        this.id = product.getId();
        this.category = product.getCategory();
        this.description = product.getDescription();
        this.name = product.getName();
        this.price = product.getPrice();
        this.imagePath = product.getImagePath();
        this.stock = product.getStock();
    }
}
