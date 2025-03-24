// Package declaration
package com.anieto1.job_tracking_system.auth.controller;

// Import statements
import com.anieto1.job_tracking_system.auth.dto.LoginRequest;
import com.anieto1.job_tracking_system.auth.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

// Controller class annotations
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Autowired dependencies
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Authenticate the user credentials
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        // Get user details from authentication
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // Generate JWT token
        String jwt = jwtUtils.generateToken(userDetails);

        // Create response with token
        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);
        return ResponseEntity.ok(response);
    }
}