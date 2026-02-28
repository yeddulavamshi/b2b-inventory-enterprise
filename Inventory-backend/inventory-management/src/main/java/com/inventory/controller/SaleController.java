package com.inventory.controller;

import com.inventory.entity.Sale;
import com.inventory.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:5173")
public class SaleController {

    @Autowired
    private SaleService saleService;
    
 // ... inside SaleController ...

    @Autowired 
    private com.inventory.repository.SaleRepository saleRepository; // Ensure this is autowired

    // NEW ENDPOINT: Get All Sales History
    @GetMapping
    public java.util.List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    // POST /api/sales
    // React sends: { "productId": 1, "userId": 1, "quantity": 5 }
    @PostMapping
    public ResponseEntity<?> createSale(@RequestBody Map<String, Object> saleData) {
        try {
            Integer productId = Integer.parseInt(saleData.get("productId").toString());
            Integer userId = Integer.parseInt(saleData.get("userId").toString());
            Integer quantity = Integer.parseInt(saleData.get("quantity").toString());

            Sale sale = saleService.createSale(productId, userId, quantity);
            return ResponseEntity.ok(sale);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}