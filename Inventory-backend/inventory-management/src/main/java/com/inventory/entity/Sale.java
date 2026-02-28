package com.inventory.entity;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "sales")
@Data
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // RELATIONSHIP: This sale belongs to a specific Product
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "quantity_sold", nullable = false)
    private Integer quantitySold;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "sale_date", updatable = false)
    private LocalDateTime saleDate;

    @PrePersist
    protected void onCreate() {
        saleDate = LocalDateTime.now();
    }
}