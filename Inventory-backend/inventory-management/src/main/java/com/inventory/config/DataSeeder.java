package com.inventory.config;

import com.inventory.entity.User;
import com.inventory.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            // Check if Admin exists. If not, create one.
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword("admin123"); // Simple password for now
                admin.setRole("ADMIN");
                userRepository.save(admin);
                System.out.println("✅ SUPER ADMIN CREATED: Username: admin / Password: admin123");
            }
        };
    }
}