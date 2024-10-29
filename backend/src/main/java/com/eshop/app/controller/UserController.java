package com.eshop.app.controller;

import com.eshop.app.dto.RolesDTO;
import com.eshop.app.dto.UserDTO;
import com.eshop.app.entity.User;
import com.eshop.app.repository.UserRepository;
import com.eshop.app.security.auth.AuthRequest;
import com.eshop.app.security.configuration.filter.JwtService;
import com.eshop.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;


    @GetMapping("/roles")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<RolesDTO> getMyRoles() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        long logged_id = userService.getUserInfo(username).getId();
        return new ResponseEntity<>(userService.getUserRoles(logged_id), HttpStatus.OK);
    }


    @PostMapping
    public User createUser(@RequestBody UserDTO user) {
        return userService.registerUser(user);
    }


    @GetMapping("/all")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<List<UserDTO>> findAll() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }


    @GetMapping("/profile")
    @PreAuthorize("hasRole('Admin') or hasRole('User')")
    public ResponseEntity<UserDTO> getUserByUsername() {
        String username= SecurityContextHolder.getContext().getAuthentication().getName();
        UserDTO userDTO = userService.getUserInfo(username);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }


    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>(userService.getUserById(userId),HttpStatus.OK);
    }


    @PutMapping("/profile")
    @PreAuthorize("hasRole('Admin') or hasRole('User')")
        public ResponseEntity<User> updateProfile(@RequestBody User updatedUser, Authentication authentication) {
            String username = authentication.getName();
            Long userId = userRepository.findUserByUsername(username).get().getId();
            User updatedProfile = userService.updateProfile(userId, updatedUser);

            if (updatedProfile != null) {
                return ResponseEntity.ok(updatedProfile);
            } else {
                return ResponseEntity.badRequest().build();
            }
    }


    @PutMapping("/updateUser/{userId}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<User> updateUser(@PathVariable("userId") Long userId, @RequestBody UserDTO userDTO) {
        User updatedUser = userService.updateUser(userId, userDTO);
        User user = userRepository.getReferenceById(userId);
        return new ResponseEntity<>(user ,HttpStatus.OK);

    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping("/signup")
    public ResponseEntity<String> addNewUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.singUp(user), HttpStatus.CREATED);
    }


    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Optional<User> user = userRepository.findUserByUsername(authRequest.getUsername());

        if (user.isPresent()) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(authRequest.getUsername(), user.get().getRole());
                return new ResponseEntity<>(token, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Authentication failed", HttpStatus.UNAUTHORIZED);
            }
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }
}
