package com.inventory.service;

import com.inventory.entity.Product;
import com.inventory.entity.Sale;
import com.inventory.entity.User;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.SaleRepository;
import com.inventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional // If anything fails, ROLLBACK everything
    public Sale createSale(Integer productId, Integer userId, Integer quantity) {
        
        // 1. Fetch Product
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // 2. Fetch User (Who is selling?)
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. Check Stock
        if (product.getStockQuantity() < quantity) {
            throw new RuntimeException("Not enough stock! Available: " + product.getStockQuantity());
        }

        // 4. Update Stock (Subtract)
        product.setStockQuantity(product.getStockQuantity() - quantity);
        productRepository.save(product);

        // 5. Calculate Total Price
        BigDecimal total = product.getPrice().multiply(BigDecimal.valueOf(quantity));

        // 6. Save Sale Record
        Sale sale = new Sale();
        sale.setProduct(product);
        sale.setUser(user); // Link the sale to the user
        sale.setQuantitySold(quantity);
        sale.setTotalPrice(total);
        
        return saleRepository.save(sale);
    }
}