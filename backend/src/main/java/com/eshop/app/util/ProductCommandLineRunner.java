package com.eshop.app.util;



import com.eshop.app.entity.Product;
import com.eshop.app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class ProductCommandLineRunner implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductNameParser productParser;

    @Override
    public void run(String... args) throws Exception {
        String folderPath = "../src/main/resources/static/images";


        List<ProductNameParser.ParsedProduct> parsedProducts = productParser.parseProductsFromDirectory(folderPath);
        List<Product> products = new ArrayList<>();
        Random random = new Random();

        for (ProductNameParser.ParsedProduct parsedProduct : parsedProducts) {
            Product product = new Product();
            product.setName(parsedProduct.getName().replaceFirst("-", ""));
            product.setCategory(parsedProduct.getCategory());
            product.setDescription(parsedProduct.getDescription());
            product.setPrice(parsedProduct.getPrice());
            product.setStock(parsedProduct.getStock());
            product.setImagePath( parsedProduct.getImagePath() );
            products.add(product);
        }


        productRepository.saveAll(products);
        System.out.println("Products imported successfully!");
    }
}

