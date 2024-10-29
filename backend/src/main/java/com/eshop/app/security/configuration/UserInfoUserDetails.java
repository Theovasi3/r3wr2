package com.eshop.app.security.configuration;

import com.eshop.app.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class UserInfoUserDetails implements UserDetails {


    private String name;
    private String password;
    private String role;
    private boolean isLoggedIn;
    private String jwt;
    Set<SimpleGrantedAuthority> authorities = new HashSet<>();


    public UserInfoUserDetails(User user) {
        name=user.getUsername();
        password=user.getPassword();
        role=user.getRole();
        this.isLoggedIn = false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.role));
        this.isLoggedIn = true;
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.isLoggedIn;
    }


}