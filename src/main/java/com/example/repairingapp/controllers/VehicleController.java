package com.example.repairingapp.controllers;

import com.example.repairingapp.entities.Vehicle;
import com.example.repairingapp.services.VehicleService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("vehicles")
public class VehicleController {
    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public List<Vehicle> getVehicles() {
        return vehicleService.getVehicles();
    }
    @GetMapping("/{id}")
    public Optional<Vehicle> getVehicle(@PathVariable Long id) {
        return vehicleService.getVehicle(id);
    }
    @PostMapping
    public Vehicle addNewVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.addNewVehicle(vehicle);
    }

    @PutMapping("/{id}")
    public Vehicle updateVehicle(@PathVariable Long id, @RequestBody Vehicle updatedVehicle) {
        return vehicleService.updateVehicle(id, updatedVehicle);
    }

    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
    }

}
