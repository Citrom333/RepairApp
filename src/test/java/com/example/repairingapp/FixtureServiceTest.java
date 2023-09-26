package com.example.repairingapp;
import com.example.repairingapp.entities.Shop;
import com.example.repairingapp.services.ShopService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.example.repairingapp.entities.Fixture;
import com.example.repairingapp.services.FixtureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
@SpringBootTest
@Transactional
public class FixtureServiceTest {
    @Autowired
    private FixtureService fixtureService;
    @Autowired
    private ShopService shopService;

    Shop mockShop=new Shop("testShop", "testAddress", "test@email.com", "123456789");
    Fixture mockFixture = new Fixture("testFixture",mockShop);

    @BeforeEach
    public void setUp() {
       shopService.addShop(mockShop);
       fixtureService.addNewFixture(mockFixture);
    }

    @Test
    void testAddNewFixture() {
        Fixture fixture = new Fixture("testAddFixture",mockShop);
        fixtureService.addNewFixture(fixture);
        List<Fixture> fixtures = fixtureService.getFixtures();
        assertEquals(2, fixtures.size());
        assertEquals(fixture, fixtures.get(1));
    }

    @Test
    void testGetFixtures() {
        List<Fixture> fixtures = fixtureService.getFixtures();
        assertEquals(1, fixtures.size());
        assertEquals(mockFixture, fixtures.get(0));
    }
}