package com.anieto1.job_tracking_system.user.model;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // This method allows searching for a user by their email address
    Optional<User> findByEmail(String email);
}

// This interface extends JpaRepository, which provides a set of methods for
// managing User entities
// The User type is the entity class, and Long is the type of the entity's ID
// field
// Optional<User> is a container object that represents a single value that may
// be present or absent
// findByEmail is a custom query method that allows searching for a user by
// their email address
