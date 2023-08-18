package com.example.repairingapp.services;

import com.example.repairingapp.entities.Shop;
import com.example.repairingapp.repositories.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopService {
    private ShopRepository shopRepository;
@Autowired
    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }
    public void AddShop(Shop shop){
    shopRepository.save(shop);
    }

    public List<Shop> GetShops()
    {
        return shopRepository.findAll();
    }
}
