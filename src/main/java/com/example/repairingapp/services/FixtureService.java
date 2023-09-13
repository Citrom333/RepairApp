package com.example.repairingapp.services;

import com.example.repairingapp.entities.Fixture;
import com.example.repairingapp.repositories.FixtureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FixtureService {
    private FixtureRepository fixtureRepository;
@Autowired
    public FixtureService(FixtureRepository fixtureRepository) {
        this.fixtureRepository = fixtureRepository;
    }

    public void addNewFixture(Fixture fixture){
        fixtureRepository.save(fixture);
    }

    public List<Fixture> getFixtures() {
        return fixtureRepository.findAll();
    }
}
