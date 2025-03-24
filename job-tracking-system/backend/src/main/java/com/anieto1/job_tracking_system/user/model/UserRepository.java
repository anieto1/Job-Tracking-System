package com.anieto1.job_tracking_system.user.model;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // This method allows searching for a user by their email address
    Optional<User> findByEmail(String email);

    Optional<User> findByName(String name);

}

// This interface extends JpaRepository, which provides a set of methods for
// managing User entities
// The User type is the entity class, and Long is the type of the entity's ID
// field
// Optional<User> is a container object that represents a single value that may
// be present or absent
// findByEmail is a custom query method that allows searching for a user by
// their email address
