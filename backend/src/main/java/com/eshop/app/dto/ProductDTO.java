package com.eshop.app.dto;

import com.eshop.app.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductDTO {


    private Long id;
    private String name;
    private String category;
    private String description;
    private String imagePath;
    private double price;
    private int stock;

    public ProductDTO(Product product){
        this.id = product.getId();
        this.category = product.getCategory();
        this.description = product.getDescription();
        this.name = product.getName();
        this.price = product.getPrice();
        this.imagePath = product.getImagePath();
        this.stock = product.getStock();
    }
}