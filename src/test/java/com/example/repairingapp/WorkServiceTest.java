package com.example.repairingapp;
import com.example.repairingapp.entities.Fixture;
import com.example.repairingapp.entities.Shop;
import com.example.repairingapp.entities.Vehicle;
import com.example.repairingapp.entities.Work;
import com.example.repairingapp.services.FixtureService;
import com.example.repairingapp.services.ShopService;
import com.example.repairingapp.services.VehicleService;
import com.example.repairingapp.services.WorkService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
public class WorkServiceTest {

    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private WorkService workService;
    @Autowired
    private FixtureService fixtureService;
    @Autowired
    private ShopService shopService;
    Vehicle mockVehicle1=new Vehicle("AABB-001", 2001, "brand", "type");
    Vehicle mockVehicle2=new Vehicle("AABB-002", 2001, "brand", "type");
    Shop mockShop1=new Shop("testShop", "testAddress", "test@email.com", "123456789");
  //  Work mockWork1=new Work("mockWork1", "no comment", vehicleService.getVehicles().get(0), new Date(2020 - 01 - 01), 1111, Arrays.asList(fixtureService.getFixtures().get(0)));

    @BeforeEach
    public void setUp() {
        shopService.addShop(mockShop1);
        fixtureService.addNewFixture(new Fixture("fixt", shopService.getShops().get(0)));
        vehicleService.addNewVehicle(mockVehicle1);
        vehicleService.addNewVehicle(mockVehicle2);
        workService.addNewWork(new Work("mockWork1", "no comment", vehicleService.getVehicles().get(0), new Date(2020 - 01 - 01), 1111, Arrays.asList(fixtureService.getFixtures().get(0))));
        workService.addNewWork(new Work("mockWork2", "no comment", vehicleService.getVehicles().get(0), new Date(2020 - 02 - 01), 2111, Arrays.asList(fixtureService.getFixtures().get(0))));
        workService.addNewWork(new Work("mockWork3", "no comment", vehicleService.getVehicles().get(1), new Date(2020 - 03 - 01), 3111, Arrays.asList(fixtureService.getFixtures().get(0))));
       };
   @Test
    void testAddNewWork() {
        List<Vehicle> vehicles=vehicleService.getVehicles();
        Work newWork=new Work("mockWork4", "no comment", vehicles.get(1), new Date(2021 - 01 - 01), 2222, Arrays.asList(fixtureService.getFixtures().get(0)));
        workService.addNewWork(newWork);
        List<Work> works = workService.getWorks();
        assertEquals(4, works.size());
        assertEquals(newWork, works.get(3));
    }
    @Test
    void testUpdateWork() {
        Work updatedWork= new Work("updatedWork", "no comment", vehicleService.getVehicles().get(1), new Date(2020 - 01 - 01), 1100, Arrays.asList(fixtureService.getFixtures().get(0)));
        workService.updateWork(workService.getWorks().get(0).getId(), updatedWork);
        List<Work> works = workService.getWorks();
        assertEquals(updatedWork.getVehicle(), works.get(0).getVehicle());
        assertEquals(updatedWork.getName(), works.get(0).getName());
        assertEquals(updatedWork.getComment(), works.get(0).getComment());
        assertEquals(updatedWork.getDate(), works.get(0).getDate());
        assertEquals(updatedWork.getMileage(), works.get(0).getMileage());
        assertEquals(updatedWork.getFixtures(), works.get(0).getFixtures());
    }

    @Test
    void testGetWorks() {
        List<Work> works = workService.getWorks();
        assertEquals(3, works.size());

    }
    @Test
    void testGetWork() {
        Optional<Work> workOptional = workService.getWork(workService.getWorks().get(0).getId());
        assertTrue(workOptional.isPresent());
        assertEquals("mockWork1", workOptional.orElse(null).getName());
    }
    @Test
    void testGetWorksForAVehicle() {
        List<Work> works = workService.getWorksForAVehicle(vehicleService.getVehicles().get(0).getId());
        assertEquals(2, works.size());
    }

    @Test
    void testDeleteWork() {
        workService.deleteWork(workService.getWorks().get(0).getId());
        List<Work> works = workService.getWorks();
        assertEquals(2, works.size());
    }
}
