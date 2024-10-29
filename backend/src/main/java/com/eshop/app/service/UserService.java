package com.eshop.app.service;

import java.util.List;

import com.eshop.app.dto.RolesDTO;
import com.eshop.app.dto.UserDTO;
import com.eshop.app.entity.Order;
import com.eshop.app.entity.User;


public interface UserService {
    User registerUser(UserDTO userDTO);

    List<UserDTO> findAll();

    User updateUser(Long id, UserDTO userDTO);

    void deleteUser(Long id);

    UserDTO getUserById(Long id);

//    List<Order> getUserOrders(String username);

    void addProductToFavorites(Long userId, Long productId);

    void removeProductFromFavorites(Long userId, Long productId);

    String singUp(User user);

    UserDTO getUserInfo(String username);

    RolesDTO getUserRoles(Long userId);

    User updateProfile(Long userId, User updatedUser);
}
