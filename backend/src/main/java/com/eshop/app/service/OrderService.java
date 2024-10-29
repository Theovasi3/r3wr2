package com.eshop.app.service;

import com.eshop.app.entity.Order;

import java.util.List;


public interface OrderService {

    Order createOrder(Long userId, List<Long> list);

    List<Order> getOrdersByUserId(Long userId);
}
