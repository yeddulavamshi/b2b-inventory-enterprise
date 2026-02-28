package com.inventory.controller;

import com.inventory.entity.User;
import com.inventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 1. LOGIN (Clean & Safe)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginDetails) {
        // "unwrap" the Optional. If no user found, gives null.
        User user = userRepository.findByUsername(loginDetails.getUsername()).orElse(null);
        
        if (user != null && user.getPassword().equals(loginDetails.getPassword())) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // 2. GET ALL USERS
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 3. REGISTER NEW USER (Clean & Fast)
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Use 'existsByUsername' - it's the professional way to check duplicates
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username already exists!");
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
    
    
 // 4. GET USER BY ID (Needed for Edit Form)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) return ResponseEntity.ok(user);
        return ResponseEntity.notFound().build();
    }

    // 5. UPDATE USER (Change Role or Password)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody User userDetails) {
        
        // 🔒 ABSOLUTE LOCK: NO ONE can ever change ID 1's Role except to "ADMIN"
        // This prevents accidental or malicious demotion of the Owner.
        if (id == 1 && !userDetails.getRole().equals("ADMIN")) {
             return ResponseEntity.badRequest().body("❌ SECURITY ALERT: You cannot demote the Master Admin!");
        }

        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null) return ResponseEntity.notFound().build();

        // Standard Update Logic
        existingUser.setUsername(userDetails.getUsername());
        existingUser.setRole(userDetails.getRole());
        
        // Only update password if a new one is typed
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            existingUser.setPassword(userDetails.getPassword());
        }
        
        userRepository.save(existingUser);
        return ResponseEntity.ok(existingUser);
    }

    // 6. DELETE USER (Fire Staff)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        // 🛡️ SUPER ADMIN PROTECTION: User ID 1 cannot be deleted
        if (id == 1) {
            return ResponseEntity.badRequest().body("❌ Error: You cannot delete the Master Admin!");
        }

        User user = userRepository.findById(id).orElse(null);
        if (user == null) return ResponseEntity.notFound().build();

        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}