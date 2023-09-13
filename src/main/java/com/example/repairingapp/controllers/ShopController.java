package com.example.repairingapp.controllers;

import com.example.repairingapp.entities.Shop;
import com.example.repairingapp.services.ShopService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("shops")
public class ShopController {
    private final ShopService shopService;
    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }
    @PostMapping
    public void addShop(@RequestBody Shop shop){
        shopService.addShop(shop);
    }
    @GetMapping
     public List<Shop> getShops() {
       return shopService.getShops();
     }
    @DeleteMapping("/{id}")
    public void deleteShop(@PathVariable Long id) {
        shopService.deleteShop(id);
    }
}
