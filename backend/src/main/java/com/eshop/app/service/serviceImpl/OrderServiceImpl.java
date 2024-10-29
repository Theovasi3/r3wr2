package com.eshop.app.service.serviceImpl;

import com.eshop.app.entity.Order;
import com.eshop.app.entity.Product;
import com.eshop.app.entity.User;
import com.eshop.app.repository.OrderRepository;
import com.eshop.app.repository.ProductRepository;
import com.eshop.app.repository.UserRepository;
import com.eshop.app.service.OrderService;

import java.time.LocalDateTime;
import java.util.List;

public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderServiceImpl(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public Order createOrder(Long userId, List<Long> productIds) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Product> products = productRepository.findAllById(productIds);

        Order order = Order.builder()
                .orderDate(LocalDateTime.now())
                .user(user)
                .products(products)
                .status("Pending")
                .build();

        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findAllByUserId(userId);
    }
}
