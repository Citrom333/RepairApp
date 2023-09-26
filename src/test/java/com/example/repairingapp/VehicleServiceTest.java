package com.example.repairingapp;
import com.example.repairingapp.entities.Vehicle;
import com.example.repairingapp.services.VehicleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
public class VehicleServiceTest {

    @Autowired
    private VehicleService vehicleService;
    Vehicle mockVehicle1=new Vehicle("AABB-001", 2001, "brand", "type");
    Vehicle mockVehicle2=new Vehicle("AABB-002", 2001, "brand", "type");

    @BeforeEach
    public void setUp() {
        vehicleService.addNewVehicle(mockVehicle1);
        vehicleService.addNewVehicle(mockVehicle2);
    }

    @Test
    void testAddNewVehicle() {
        Vehicle newVehicle=new Vehicle("AABB-003", 2001, "brand", "type");
        vehicleService.addNewVehicle(newVehicle);
        List<Vehicle> vehicles = vehicleService.getVehicles();
        assertEquals(3, vehicles.size());
        assertEquals(newVehicle, vehicles.get(2));
    }
    @Test
    void testUpdateVehicle() {
       Vehicle updatedVehicle= new Vehicle("AABB-001", 2010, "updatedBrand", "updatedType");
        vehicleService.updateVehicle(vehicleService.getVehicles().get(0).getId(), updatedVehicle);
        List<Vehicle> vehicles = vehicleService.getVehicles();
        assertEquals(updatedVehicle.getLicensePlate(), vehicles.get(0).getLicensePlate());
        assertEquals(updatedVehicle.getBrand(), vehicles.get(0).getBrand());
        assertEquals(updatedVehicle.getYearOfManufacture(), vehicles.get(0).getYearOfManufacture());
        assertEquals(updatedVehicle.getType(), vehicles.get(0).getType());
    }

    @Test
    void testGetVehicles() {
        List<Vehicle> vehicles = vehicleService.getVehicles();
        assertEquals(2, vehicles.size());
        assertEquals(mockVehicle1, vehicles.get(0));
    }
    @Test
    void testGetVehicle() {
        Optional<Vehicle> vehicleOptional = vehicleService.getVehicle(vehicleService.getVehicles().get(0).getId());
        assertTrue(vehicleOptional.isPresent());
        assertEquals(mockVehicle1, vehicleOptional.orElse(null));
    }
    @Test
    void testDeleteVehicle() {
        vehicleService.deleteVehicle(vehicleService.getVehicles().get(0).getId());
        List<Vehicle> vehicles = vehicleService.getVehicles();
        assertEquals(1, vehicles.size());
    }
}
