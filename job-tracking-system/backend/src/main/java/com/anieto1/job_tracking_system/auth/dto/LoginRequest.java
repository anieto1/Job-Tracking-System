package com.anieto1.job_tracking_system.auth.dto;

/**
 * Data Transfer Object (DTO) for handling login requests.
 * This class encapsulates the username and password credentials
 * sent by clients during authentication.
 */
public class LoginRequest {
    // Username field for authentication
    private String username;

    // Password field for authentication
    private String password;

    /**
     * Gets the username.
     * 
     * @return the username string
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username.
     * 
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the password.
     * 
     * @return the password string
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password.
     * 
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }
}