package com.eshop.app.security.auth;


import com.eshop.app.security.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/generateToken")
    public ResponseEntity<String> generateToken(AuthRequest authRequest) {
        return authService.generateToken(authRequest);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        return authService.auth(authRequest);
    }

    @PostMapping("/logout")
    @PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
    public ResponseEntity<String> logout (@RequestBody LogoutRequest logoutRequest){
        return authService.logout(logoutRequest);
    }
}
