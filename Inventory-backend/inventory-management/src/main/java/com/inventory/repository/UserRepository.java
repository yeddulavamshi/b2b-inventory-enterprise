package com.inventory.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	// Used for Login: "SELECT * FROM users WHERE username = ?"
    Optional<User> findByUsername(String username);

    // Used for Registration: Check if username is taken
    boolean existsByUsername(String username);
}
