package com.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.entity.Supplier;
import com.inventory.repository.SupplierRepository;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "http://localhost:5173")
public class SupplierController {

    @Autowired
    private SupplierRepository supplierRepository;

    // 1. Get ALL Suppliers
    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    // 2. Get Single Supplier (For Editing)
    @GetMapping("/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable Integer id) {
        return supplierRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. Add Supplier
    @PostMapping
    public Supplier createSupplier(@RequestBody Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    // 4. Update Supplier (NEW)
    @PutMapping
    public ResponseEntity<Supplier> updateSupplier(@RequestBody Supplier supplierDetails) {
        return supplierRepository.findById(supplierDetails.getId())
                .map(existingSupplier -> {
                    existingSupplier.setName(supplierDetails.getName());
                    existingSupplier.setContactEmail(supplierDetails.getContactEmail());
                    existingSupplier.setPhoneNumber(supplierDetails.getPhoneNumber());
                    return ResponseEntity.ok(supplierRepository.save(existingSupplier));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. Delete Supplier (NEW)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSupplier(@PathVariable Integer id) {
        supplierRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}