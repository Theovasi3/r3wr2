package com.eshop.app.security.configuration;



import com.eshop.app.entity.User;
import com.eshop.app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
public class UserInfoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            Optional<User> userInfo = repository.findUserByUsername(username);
            return userInfo.map(UserInfoUserDetails::new)
                    .orElseThrow(() -> new UsernameNotFoundException("Ο χρήστης " + username + " δεν βρέθηκε"));
        } catch (UsernameNotFoundException ex) {
            log.error("An error occurred while loading user by username: {}", ex);
            throw new UsernameNotFoundException("Σφάλμα κατά τη φόρτωση του χρήστη με username: " + username);
        }
    }
}