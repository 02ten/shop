package com.ten.server.controller;

import com.ten.server.config.JWTUtil;
import com.ten.server.dto.UserDTO;
import com.ten.server.entity.Role;
import com.ten.server.entity.User;
import com.ten.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDto) {
        System.out.println(userDto.getUsername() + " " + userDto.getPassword());
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDto.getUsername(),
                        userDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        String jwt = jwtUtil.generateToken(user.getUsername());

        Set<String> roles = user.getRoles().stream().map(Role::getAuthority).collect(Collectors.toSet());
        return ResponseEntity.ok(new JWTResponse(jwt, user.getId(), user.getUsername(), user.getName(), user.getTelephone(), roles));
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDto) {
        userService.createUser(userDto);
        return ResponseEntity.ok("User registered successfully!");
    }

    record JWTResponse(String access_token, Long id, String email, String name, String telephone, Set<String> roles) {
    }
}
