package com.ten.server.controller;

import com.ten.server.config.JWTAuthFilter;
import com.ten.server.config.JWTUtil;
import com.ten.server.dto.UserDTO;
import com.ten.server.entity.Role;
import com.ten.server.entity.User;
import com.ten.server.repositories.UserRepository;
import com.ten.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://89.19.176.6:3000")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final JWTAuthFilter jwtAuthFilter;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDto) {
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

    @GetMapping("/check")
    public ResponseEntity<?> checkUser(@RequestHeader("authorization") String token) {
        String authToken = token.split(" ")[1];
        if (!Objects.isNull(authToken)) {
            String userName = jwtUtil.getUsernameFromToken(authToken);
            if (!Objects.isNull(userName)) {
                UserDetails userDetails = userService.loadUserByUsername(userName);
                if (jwtUtil.validateToken(authToken, userDetails)) {
                    User user = userRepository.findUserByUsername(userDetails.getUsername());
                    String jwt = jwtUtil.generateToken(user.getUsername());
                    Set<String> roles = user.getRoles().stream().map(Role::getAuthority).collect(Collectors.toSet());
                    return ResponseEntity.ok(new JWTResponse(jwt, user.getId(), user.getUsername(), user.getName(), user.getTelephone(), roles));
                }
            }
        }
        return ResponseEntity.ok("Not auth");
    }

    @GetMapping("/asd")
    public ResponseEntity<?> asd() {
        return ResponseEntity.ok("Everything is fine");
    }

    record JWTResponse(String access_token, Long id, String email, String name, String telephone, Set<String> roles) {
    }
}
