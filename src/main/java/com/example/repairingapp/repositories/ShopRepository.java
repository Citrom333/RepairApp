package com.example.repairingapp.repositories;

import com.example.repairingapp.entities.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopRepository extends JpaRepository<Shop, Long> {
}
