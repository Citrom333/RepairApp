package com.example.repairingapp.repositories;

import com.example.repairingapp.entities.Fixture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FixtureRepository extends JpaRepository<Fixture, Long> {
}
