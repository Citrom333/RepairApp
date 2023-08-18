package com.example.repairingapp.services;

import com.example.repairingapp.entities.Vehicle;
import com.example.repairingapp.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {
    private VehicleRepository vehicleRepository;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle addNewVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
        Vehicle existingVehicle = vehicleRepository.findById(id).orElse(null);
        if (existingVehicle != null) {
            // Update the properties of the existingVehicle object with the values from updatedVehicle
            existingVehicle.setBrand(updatedVehicle.getBrand());
            existingVehicle.setType(updatedVehicle.getType());
            // Update other properties as needed
            return vehicleRepository.save(existingVehicle);
        }
        return null; // Vehicle not found
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    public Optional<Vehicle> getVehicle(Long id) {
        return vehicleRepository.findById(id);
    }
}