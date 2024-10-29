package com.eshop.app.util;

import lombok.*;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;


@Component
public class ProductNameParser {


        @Setter
        @Getter
        public static class ParsedProduct {
            private String name;
            private String category;
            private String description;
            private String imagePath;
            private double price;
            private int stock;

            public ParsedProduct(String name, String category,String description, String imagePath, double price, int stock) {
                this.name = name;
                this.category = category;
                this.description=description;
                this.imagePath = imagePath;
                this.price = price;
                this.stock = stock;
            }

            @Override
            public String toString() {
                return "ParsedProduct{" +
                        "name='" + name + '\'' +
                        ", category='" + category + '\'' +
                        ", description='" + description + '\'' +
                        ", imagePath='" + imagePath + '\'' +
                        ", price=" + price +
                        ", stock=" + stock +
                        '}';
            }
        }

        public static List<ParsedProduct> parseProductsFromDirectory(String directoryPath) {
            List<ParsedProduct> parsedProducts = new ArrayList<>();
            File folder = new File(directoryPath);
            File[] files = folder.listFiles((dir, name) -> name.endsWith(".png"));

            if (files != null) {
                for (File file : files) {
                    String fileName = file.getName();
                    ParsedProduct parsedProduct = parseFileName(fileName);
                    parsedProducts.add(parsedProduct);
                }
            }

            return parsedProducts;
        }

        private static ParsedProduct parseFileName(String fileName) {
            String description = fileName.substring(0, fileName.lastIndexOf("."));
            String[] parts = fileName.split("-");

            StringBuilder nameBuilder = new StringBuilder();
            String category = "unknown";

            for (String part : parts) {
                if (part.equalsIgnoreCase("mens")) {
                    category = "Men";
                }else if ( part.equalsIgnoreCase("womens")) {
                    category = "Women";
                }else if (part.equalsIgnoreCase("little") || part.equalsIgnoreCase("big")) {
                    category = "Kids";
                } else if (!part.matches("[A-Za-z0-9]+")) {
                    break;
                } else {
                    nameBuilder.append(part).append(" ");
                }
            }

            String name = nameBuilder.toString().trim();

            double price = generateRandomPrice(60, 200);
            int stock = generateRandomStock(0, 20);

            String imagePath = "/images/" + fileName;

            return new ParsedProduct(name, category, description, imagePath, price, stock);
        }

        private static double generateRandomPrice(double minPrice, double maxPrice) {
            Random random = new Random();
            return Math.round(minPrice + (maxPrice - minPrice) * random.nextDouble());
        }

        private static int generateRandomStock(int minStock, int maxStock) {
            Random random = new Random();
            return random.nextInt((maxStock - minStock) + 1) + minStock;
        }
}
