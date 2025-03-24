package com.anieto1.job_tracking_system.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuration class for Spring Security settings.
 * Handles authentication, authorization, and security filter configurations.
 */
@Configuration // Indicates this is a configuration class
@EnableWebSecurity // Enables Spring Security's web security support
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter; // Custom JWT filter for token-based authentication

    /**
     * Configures the security filter chain for HTTP requests.
     * Defines security rules, authentication, and authorization settings.
     *
     * @param http HttpSecurity object to configure
     * @return Configured SecurityFilterChain
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF protection for stateless API
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll() // Allow public access to auth endpoints
                        .anyRequest().authenticated()) // Require authentication for all other endpoints
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Use stateless sessions for JWT
                .authenticationProvider(authenticationProvider()) // Set the authentication provider
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter

        return http.build();
    }

    /**
     * Configures the authentication provider.
     * Sets up user details service and password encoder.
     *
     * @return Configured AuthenticationProvider
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Creates the authentication manager bean.
     * Used for authenticating user credentials.
     *
     * @param config Authentication configuration
     * @return AuthenticationManager instance
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Configures the password encoder for secure password hashing.
     * Uses BCrypt hashing algorithm.
     *
     * @return PasswordEncoder instance
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Provides the user details service.
     * This service is responsible for loading user-specific data.
     *
     * @return UserDetailsService implementation
     */
    @Bean
    public UserDetailsService userDetailsService() {
        // This should be implemented to load user details from your database
        return null; // TODO: Implement UserDetailsService
    }
}