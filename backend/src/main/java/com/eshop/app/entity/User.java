package com.eshop.app.entity;

import java.util.*;

import com.eshop.app.dto.UserDTO;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "users")
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;

    @Column(name = "is_logged_in")
    private boolean isLoggedIn;

   @Getter
   @Setter
    private String role;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Order> orders;

    @ManyToMany
    @JoinTable(
            name = "user_favorites",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> favorites;


    public User(UserDTO userDTO){
        this.id = userDTO.getId();
        this.username = userDTO.getUsername();
        this.password = userDTO.getPassword();
        this.email = userDTO.getEmail();
        this.firstName = userDTO.getFirstName();
        this.lastName = userDTO.getLastName();
        this.role = String.valueOf(userDTO.getRole());
    }

    public <E> User(String username, String password, ArrayList<E> es) {
        this.username = username;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.role));
        return authorities;
    }

    public void addFavorite(Product product) {
        favorites.add(product);
    }

    public void removeFavorite(Product product ) {
        favorites.remove(product);
    }

    public void setLoggedIn(){
        this.isLoggedIn = true;
    }

    public void setLoggedOut(){
        this.isLoggedIn = false;
    }

}