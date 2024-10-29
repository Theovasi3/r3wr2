package com.eshop.app.dto;

import com.eshop.app.entity.User;
import com.eshop.app.enums.Role;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RolesDTO {

    private String username;
    private Role role;
    private boolean isSupervisor;

    public RolesDTO(User user) {
        this.username = user.getUsername();
        this.role = Role.valueOf(user.getRole());
    }
}
