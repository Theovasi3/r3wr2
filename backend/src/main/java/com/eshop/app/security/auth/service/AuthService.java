package com.eshop.app.security.auth.service;

import com.eshop.app.security.auth.AuthController;
import com.eshop.app.security.auth.AuthRequest;
import com.eshop.app.security.auth.AuthResponse;
import com.eshop.app.security.auth.LogoutRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<String> generateToken(AuthRequest authRequest);

    ResponseEntity<AuthResponse> auth(AuthRequest authRequest);

    ResponseEntity<String> logout(LogoutRequest logoutRequest);

}