package com.popzip.dto;

import com.popzip.entity.Role;

import lombok.Builder;
import lombok.Data;

@Data
public class UserDTO {
	
	private Long id;
	private String userId;
	private String email;
	private String userName;
	private Role role;
	
	@Builder
    public UserDTO(Long id, String userId, String uPassword, String userName, String email, Role role) {
		this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.role = role;
    }
}
