package com.anieto1.job_tracking_system.auth.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Filter for handling JWT-based authentication.
 * Intercepts each request to validate JWT tokens and set up authentication.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;

    @Autowired
    public JwtAuthenticationFilter(JwtUtils jwtUtils, UserDetailsService userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Main filter method that processes each incoming HTTP request
     * to handle JWT-based authentication.
     *
     * @param request     The incoming HTTP request
     * @param response    The HTTP response
     * @param filterChain The filter chain for additional processing
     * @throws ServletException If a servlet error occurs
     * @throws IOException      If an I/O error occurs
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String requestPath = request.getServletPath();
        
        // Skip authentication for public endpoints
        if (requestPath.equals("/api/auth/login") || 
            requestPath.equals("/api/auth/register") || 
            requestPath.startsWith("/api/public/")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract the Authorization header from the request
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // If no Authorization header or not Bearer token, continue with filter chain
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract JWT token (remove "Bearer " prefix)
        jwt = authHeader.substring(7);
        // Extract username from JWT token
        userEmail = jwtUtils.extractUsername(jwt);

        // Process authentication if username exists and no authentication is set
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details from database
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // Validate token and set up authentication if valid
            if (jwtUtils.isTokenValid(jwt, userDetails)) {
                // Create authentication token with user details and authorities
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                // Add request details to authentication token
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // Set authentication in Security Context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        // Continue with filter chain
        filterChain.doFilter(request, response);
    }
}