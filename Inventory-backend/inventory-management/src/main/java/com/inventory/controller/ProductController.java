package com.inventory.controller;

import com.inventory.entity.Product;
import com.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products") // Base URL
@CrossOrigin(origins = "http://localhost:5173") // Allow React
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // 1. Get ALL products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 2. Get Single Product by ID (for Edit Page)
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. --- THIS IS THE MISSING PART CAUSING THE 404 ---
    // Get Products by Category Folder
    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Integer categoryId) {
        // Note: Ensure your Repository has findByCategory_Id
        return productRepository.findByCategory_Id(categoryId);
    }
    // ---------------------------------------------------

 // 4. Add New Product (Updated with Duplicate Check)
    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        // 1. Check if name exists
        if (productRepository.existsByName(product.getName())) {
            return ResponseEntity.badRequest().body("Error: Product '" + product.getName() + "' already exists!");
        }
        
        // 2. If new, save it
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    // 5. Update Product
    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody Product productDetails) {
        return productRepository.findById(productDetails.getId())
                .map(existingProduct -> {
                    existingProduct.setName(productDetails.getName());
                    existingProduct.setDescription(productDetails.getDescription());
                    existingProduct.setPrice(productDetails.getPrice());
                    existingProduct.setStockQuantity(productDetails.getStockQuantity());
                    existingProduct.setCategory(productDetails.getCategory());
                    existingProduct.setSupplier(productDetails.getSupplier());
                    return ResponseEntity.ok(productRepository.save(existingProduct));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 6. Delete Product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
 // ... inside ProductController ...

    // NEW ENDPOINT: Get Low Stock Items (Less than 10)
    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts() {
        return productRepository.findByStockQuantityLessThanEqual(10);
    }
}