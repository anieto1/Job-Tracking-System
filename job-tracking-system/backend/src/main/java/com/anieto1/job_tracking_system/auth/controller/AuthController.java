// Package declaration - Specifies the location of this class in the project structure
package com.anieto1.job_tracking_system.auth.controller;

// Import statements - Required dependencies for authentication, JWT handling, and REST functionality
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anieto1.job_tracking_system.auth.dto.LoginRequest;
import com.anieto1.job_tracking_system.auth.dto.RegisterRequest;
import com.anieto1.job_tracking_system.auth.security.JwtUtils;
import com.anieto1.job_tracking_system.user.model.User;
import com.anieto1.job_tracking_system.user.model.UserRepository;

/**
 * Controller class that handles authentication-related HTTP requests.
 * 
 * @RestController indicates this class will handle REST endpoints and
 *                 automatically serialize responses to JSON
 * @RequestMapping sets the base URL path for all endpoints in this controller
 *                 to "/api/auth"
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    /**
     * AuthenticationManager - Spring Security component that processes
     * authentication requests
     * Autowired to let Spring automatically inject the dependency
     */
    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * JwtUtils - Custom utility class for JWT token operations (generation,
     * validation, etc.)
     * Autowired to let Spring automatically inject the dependency
     */
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Login endpoint that handles POST requests to "/api/auth/login"
     * 
     * @param loginRequest DTO containing username and password from the client
     * @return ResponseEntity containing JWT token if authentication successful
     * 
     *         The method will:
     *         1. Authenticate credentials
     *         2. Generate JWT token
     *         3. Return token in response
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Authenticate user credentials using Spring Security's AuthenticationManager
        // If credentials are invalid, AuthenticationManager will throw an exception
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        // Extract UserDetails from the authenticated Authentication object
        // UserDetails contains user information like username, authorities, etc.
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Generate JWT token using the authenticated user's details
        String jwt = jwtUtils.generateToken(userDetails);

        // Create response containing the JWT token
        // Using HashMap to create a simple key-value pair with "token" and its value
        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);

        // Return successful response with token
        // ResponseEntity.ok() creates a response with 200 OK status
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Received registration request for email: " + registerRequest.getEmail());
        
        // Check if user already exists
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            System.out.println("Email already registered: " + registerRequest.getEmail());
            return ResponseEntity.badRequest().body("Email already registered");
        }

        System.out.println("Creating new user with email: " + registerRequest.getEmail());
        // Create new user
        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .build();

        try {
            // Save user
            userRepository.save(user);
            System.out.println("User saved successfully");

            // Generate token for the new user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(registerRequest.getEmail(), registerRequest.getPassword()));
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = jwtUtils.generateToken(userDetails);
            System.out.println("Token generated successfully");

            // Create response
            Map<String, String> response = new HashMap<>();
            response.put("token", jwt);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error during registration: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Registration failed: " + e.getMessage());
        }
    }
}