package com.inventory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	// 1. For the Dashboard (Low Stock Alert)
    List<Product> findByStockQuantityLessThanEqual(Integer quantity);

    // 2. For the Category Folder View (e.g., Show all iPhones)
    // We use "Category_Id" (underscore) to safely navigate the relationship
    List<Product> findByCategory_Id(Integer categoryId);

    // 3. For Search Bar (Superior Feature)
    List<Product> findByNameContainingIgnoreCase(String keyword);
    
 // Check if a product with this exact name already exists
    boolean existsByName(String name);
}