package com.example.repairingapp.repositories;

import com.example.repairingapp.entities.Work;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkRepository extends JpaRepository<Work, Long> {
}
