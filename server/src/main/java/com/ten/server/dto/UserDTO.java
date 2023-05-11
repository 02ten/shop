package com.ten.server.dto;

import lombok.Data;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Data
@Component
@Getter
public class UserDTO {
    private Long id;
    private String username;
    private String name;
    private String password;
    private String telephone;
}
