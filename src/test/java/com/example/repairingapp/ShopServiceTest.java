package com.example.repairingapp;
import com.example.repairingapp.entities.Shop;
import com.example.repairingapp.services.ShopService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
@SpringBootTest
@Transactional
public class ShopServiceTest {

    @Autowired
    private ShopService shopService;

    Shop mockShop1=new Shop("testShop", "testAddress", "test@email.com", "123456789");
    Shop mockShop2=new Shop("testShop2", "testAddress2", "test2@email.com", "1234567890");

    @BeforeEach
    public void setUp() {
        shopService.addShop(mockShop1);
        shopService.addShop(mockShop2);
    }

    @Test
    void testAddNewShop() {
        Shop newShop=new Shop("testShop3", "testAddress3", "test3@email.com", "1234567890");
       shopService.addShop(newShop);
        List<Shop> shops = shopService.getShops();
        assertEquals(3, shops.size());
        assertEquals(newShop, shops.get(2));
    }

    @Test
    void testGetShops() {
        List<Shop> shops = shopService.getShops();
        assertEquals(2, shops.size());
        assertEquals(mockShop1, shops.get(0));
    }

    @Test
    void testDeleteShop() {
        shopService.deleteShop(shopService.getShops().get(0).getId());
        List<Shop> shops = shopService.getShops();
        assertEquals(1, shops.size());
    }
}
