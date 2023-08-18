package com.example.repairingapp.controllers;
import com.example.repairingapp.entities.Fixture;
import com.example.repairingapp.services.FixtureService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("fixtures")
public class FixtureController {
private final FixtureService fixtureService;

    public FixtureController(FixtureService fixtureService) {
        this.fixtureService = fixtureService;
    }

    @GetMapping
    public List<Fixture> GetFixtures()
    {

        return fixtureService.GetFixtures();
    };

    @PostMapping
    public void AddFixture(@RequestBody Fixture fixture)
    {
        fixtureService.AddNewFixture(fixture);
    }


}
