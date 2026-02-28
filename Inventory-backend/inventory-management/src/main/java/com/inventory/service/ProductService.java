/*package com.inventory.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.entity.Product;
import com.inventory.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	// 1. Get all products (for the dashboard list)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 2. Get a single product (for editing or viewing details)
    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    // 3. Save or Update a product
    public Product saveProduct(Product product) {
        // BUSINES LOGIC: We can add checks here later
        // e.g., if (product.getPrice() < 0) throw Exception...
        return productRepository.save(product);
    }
    
    // 4. Delete a product
    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
    
 // 5. Get low stock products
    public List<Product> getLowStockProducts(Integer threshold) {
        return productRepository.findByStockQuantityLessThanEqual(threshold);
    }
}*/
