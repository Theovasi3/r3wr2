package com.eshop.app.controller;

import com.eshop.app.entity.User;
import com.eshop.app.exception.NotFoundException;
import com.eshop.app.repository.ProductRepository;
import com.eshop.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.eshop.app.dto.ProductDTO;
import com.eshop.app.entity.Product;
import com.eshop.app.service.ProductService;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/products")
public class ProductController {

    @Autowired ProductService productService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;


    @GetMapping
    public ResponseEntity<List<ProductDTO>> allProducts(){
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @PostMapping("/new")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO productDTO){
        return new ResponseEntity<>(productService.createProd(productDTO), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id){
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }
    

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productService.updateProduct(id, productDTO);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public void deleteProduct(@PathVariable("id") Long productId) {
        productService.deleteProduct(productId);
    }

    @GetMapping("/wishlist")
    @PreAuthorize("hasRole('User') or hasRole('Admin')")
    public List<Product> getWishlist() {
        String username= SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findUserByUsername(username);
        return user.get().getFavorites();
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('User') or hasRole('Admin')")
    public ResponseEntity<String> addToWishlist(@RequestParam Long productId) {
        String username= SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findUserByUsername(username);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found"));
        user.get().addFavorite(product);
        userRepository.save(user.get());
        return ResponseEntity.ok("Product added to wishlist");
    }

    @DeleteMapping("/remove")
    @PreAuthorize("hasRole('User') or hasRole('Admin')")
    public ResponseEntity<String> removeFromWishlist(@RequestParam Long productId) {
        String username= SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findUserByUsername(username);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found"));
        user.get().removeFavorite(product);
        userRepository.save(user.get());
        return ResponseEntity.ok("Product removed from wishlist");
    }

    @GetMapping("/prodCategory")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam String category) {
        if (category == null || category.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<Product> products = productService.getProductsByCategory(category);
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }
}
