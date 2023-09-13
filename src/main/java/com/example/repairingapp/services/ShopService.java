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
    public void addShop(Shop shop){
    shopRepository.save(shop);
    }

    public List<Shop> getShops()
    {
        return shopRepository.findAll();
    }
    public void deleteShop(Long id) {
        shopRepository.deleteById(id);
    }
}
