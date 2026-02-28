package com.inventory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
	List<Sale> findByUser_Id(Integer userId);
}