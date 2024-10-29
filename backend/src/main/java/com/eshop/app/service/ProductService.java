package com.eshop.app.service;

import java.util.List;

import com.eshop.app.dto.ProductDTO;
import com.eshop.app.entity.Product;
import com.eshop.app.entity.Review;

public interface ProductService {

    Product createProd(ProductDTO productDTO);

    ProductDTO updateProduct(Long productId, ProductDTO productDTO);

    void deleteProduct(Long productId);

    ProductDTO getProductById(Long productId);

    void addReviewToProduct(Long productId, Review review);

    List<ProductDTO> getAllProducts();

    List<Product> getProductsByCategory(String category);
}
