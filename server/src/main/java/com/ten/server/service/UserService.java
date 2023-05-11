package com.ten.server.service;

import com.ten.server.dto.UserDTO;
import com.ten.server.entity.Role;
import com.ten.server.entity.User;
import com.ten.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final RoleService roleService;
    private final UserRepository userRepo;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public void createUser(UserDTO userDto){
        if (existsByUserName(userDto.getUsername())) throw new RuntimeException("Email already exist!");
        Role role = roleService.findRoleByName("user");
        User user = new User(
                userDto.getUsername(),
                userDto.getName(),
                passwordEncoder.encode(userDto.getPassword()),
                userDto.getTelephone(),
                Set.of(role)
        );
        userRepo.save(user);
    }


    public boolean existsByUserName(String userName){
        Optional<User> byUsername = userRepo.findByUsername(userName);
        return byUsername.isPresent();
    }
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        return userRepo.findByUsername(userName).orElseThrow(() -> new UsernameNotFoundException("No user with email = " + userName));
    }


}
