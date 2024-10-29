package com.eshop.app.service.serviceImpl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.eshop.app.dto.RolesDTO;
import com.eshop.app.security.auth.service.impl.AuthEncryptDecrypt;
import com.eshop.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eshop.app.dto.UserDTO;
import com.eshop.app.entity.Order;
import com.eshop.app.entity.Product;
import com.eshop.app.entity.User;
import com.eshop.app.exception.NotFoundException;
import com.eshop.app.repository.ProductRepository;
import com.eshop.app.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthEncryptDecrypt authEncryptDecrypt;

    @Autowired
    private ProductRepository productRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;


    public User updateUser(Long id, UserDTO updatedUser) {
        Optional<User> existingUser = userRepository.findById(id);

        if (existingUser.isPresent()) {
            existingUser.get().setUsername(updatedUser.getUsername());
            existingUser.get().setEmail(updatedUser.getEmail());
            existingUser.get().setFirstName(updatedUser.getFirstName());
            existingUser.get().setLastName(updatedUser.getLastName());
            existingUser.get().setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            existingUser.get().setRole(updatedUser.getRole());

            return userRepository.save(existingUser.get());
        }
        return null;
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }


    @Override
    public User registerUser(UserDTO userDTO) {
        return null;
    }

    public List<UserDTO> findAll(){
        return userRepository.findAll().stream()
                .map(UserDTO::new)
                .toList();
    }


    public UserDTO getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return new UserDTO(user.get());
        }else{
            throw new NotFoundException("User not found");
        }

    }



//    public List<Order> getUserOrders(String username) {
//        User user =  userRepository.findUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
//        return user.getOrders();
//    }

    public void addProductToFavorites(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        user.getFavorites().add(product);
        userRepository.save(user);
    }


    public void removeProductFromFavorites(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        user.getFavorites().remove(product);
        userRepository.save(user);
    }

    @Override
    public String singUp(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole("User");
        }
        userRepository.save(user);
        return "user added to system ";
    }


    public UserDTO getUserInfo(String username) {
        Optional<User> foundUser = userRepository.findAll()
                .stream()
                .filter(user -> Objects.equals(user.getUsername(), username))
                .findFirst();
        if (foundUser.isPresent()) {
            return new UserDTO(foundUser.get());
        } else throw new NotFoundException("Δε βρέθηκε χρήστης με το ζητούμενο username: " + username);
    }


    public RolesDTO getUserRoles(Long userId) {
        Optional<User> myUser = userRepository.findById(userId);
        if (myUser.isPresent()) {
            return new RolesDTO(myUser.get());
        } else {
            throw new NotFoundException("Δε βρέθηκε χρήστης με το ζητούμενο id: " + userId);
        }
    }

    public User updateProfile(Long userId, User updatedUser) {
        Optional<User> existingUser = userRepository.findById(userId);

        if (existingUser.isPresent()) {
            existingUser.get().setEmail(updatedUser.getEmail());
            existingUser.get().setFirstName(updatedUser.getFirstName());
            existingUser.get().setLastName(updatedUser.getLastName());
            existingUser.get().setPassword(passwordEncoder.encode(updatedUser.getPassword()));

            return userRepository.save(existingUser.get());
        }

        return null;
    }

}