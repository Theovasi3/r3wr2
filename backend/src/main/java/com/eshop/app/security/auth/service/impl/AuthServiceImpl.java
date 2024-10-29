package com.eshop.app.security.auth.service.impl;



import com.eshop.app.entity.User;
import com.eshop.app.exception.NotFoundException;
import com.eshop.app.repository.UserRepository;
import com.eshop.app.security.auth.AuthController;
import com.eshop.app.security.auth.AuthRequest;
import com.eshop.app.security.auth.AuthResponse;
import com.eshop.app.security.auth.LogoutRequest;
import com.eshop.app.security.auth.service.AuthService;
import com.eshop.app.security.configuration.filter.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userInfoRepository;

    @Autowired
    private AuthEncryptDecrypt authEncryptDecrypt;

    @Override
    public ResponseEntity<String> generateToken(AuthRequest authRequest) {
        Optional<User> user = userInfoRepository.findUserByUsername(authRequest.getUsername());
        return new ResponseEntity<>("token: " + jwtService.generateToken(authRequest.getUsername(), user.get().getUsername() ), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<AuthResponse> auth(AuthRequest authRequest) {
        try{
            String username = authRequest.getUsername();
            Optional<User> user = userInfoRepository.findUserByUsername(username);
            if (user.isPresent()){
                boolean checkPassword = authEncryptDecrypt.checkPassword(authRequest.getPassword(), user.get().getPassword());
                    user.get().setLoggedIn();
                    userInfoRepository.save(user.get());
                    AuthResponse myResponse = new AuthResponse(jwtService.generateToken(authRequest.getUsername(), user.get().getRole() ), user.get().getRole());
                    return new ResponseEntity<>(myResponse, HttpStatus.OK);
            }
        } catch (Exception ex) {
            log.error("{}", ex);
        }
        throw new NotFoundException("Token not valid");
    }

    @Override
    public ResponseEntity<String> logout(LogoutRequest logoutRequest) {
        try {
            String username = logoutRequest.getUsername();
            Optional<User> user = userInfoRepository.findUserByUsername(username);
            if (user.isPresent()) {
                user.get().setLoggedOut();
                userInfoRepository.save(user.get());
                return new ResponseEntity<>("Αποσυνδεθήκατε επιτυχώς!", HttpStatus.OK);
            }
        } catch (Exception ex) {
            log.error("{}", ex);
        }
        return new ResponseEntity<>("Το username " + logoutRequest.getUsername() + " είναι λάθος..", HttpStatus.BAD_REQUEST);
    }
}
