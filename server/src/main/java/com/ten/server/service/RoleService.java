package com.ten.server.service;

import com.ten.server.entity.Role;
import com.ten.server.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepo;

    public Role findRoleByName(String name){
        return roleRepo.findByName(name);
    }

}
