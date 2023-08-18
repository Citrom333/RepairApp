package com.example.repairingapp;

import com.example.repairingapp.entities.Fixture;
import com.example.repairingapp.entities.Shop;
import com.example.repairingapp.entities.Vehicle;
import com.example.repairingapp.repositories.FixtureRepository;
import com.example.repairingapp.repositories.ShopRepository;
import com.example.repairingapp.repositories.VehicleRepository;
import com.example.repairingapp.repositories.WorkRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RepairingAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(RepairingAppApplication.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner(VehicleRepository vehicleRepository, ShopRepository shopRepository, FixtureRepository fixtureRepository, WorkRepository workRepository) {
		return args -> {
			vehicleRepository.save(new Vehicle("MNM-260", 2010, "Scania", "460S"));
			vehicleRepository.save(new Vehicle("FTFT-001", 2022, "Volvo", "FH500"));
			shopRepository.save(new Shop("Kovács Autóalkatrészek", "Szeged, Kossuth Lajos sgrt. 87, 6724", "info@kovacsauto.hu", "(06 62) 468 444"));
			shopRepository.save(new Shop("Kamion Shop Kft.", "6791 Szeged, Dorozsmai út 116", "info@kamionshopkft.hu", "+36 20 456 6403"));
		};
	}

}
