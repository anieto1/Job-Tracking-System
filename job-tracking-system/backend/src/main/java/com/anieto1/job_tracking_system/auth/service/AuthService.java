package com.anieto1.job_tracking_system.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.anieto1.job_tracking_system.auth.model.AuthRequest;
import com.anieto1.job_tracking_system.auth.security.JwtUtils;
import com.anieto1.job_tracking_system.user.model.UserRepository;

import java.util.ArrayList;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public String authenticateUser(AuthRequest request) {
        com.anieto1.job_tracking_system.user.model.User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        UserDetails userDetails = User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(new ArrayList<>())
                .build();

        return jwtUtils.generateToken(userDetails);
    }
}
