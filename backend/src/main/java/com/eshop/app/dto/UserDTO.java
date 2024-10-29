package com.eshop.app.dto;


import com.eshop.app.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class UserDTO {
        private Long id;
        private String username;
        private String password;
        private String firstName;
        private String lastName;
        private String email;
        private String role;
    

        public UserDTO(User user){
            this.id = user.getId();
            this.username = user.getUsername();
            this.password = user.getPassword();
            this.email = user.getEmail();
            this.firstName = user.getFirstName();
            this.lastName = user.getLastName();
            this.role = user.getRole();
        }

}
