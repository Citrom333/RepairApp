package com.example.repairingapp.controllers;
import com.example.repairingapp.entities.Work;
import com.example.repairingapp.services.WorkService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("works")
public class WorkController {
    private final WorkService workService;

    public WorkController(WorkService workService) {
        this.workService = workService;
    }

    @GetMapping
    public List<Work> getWorks() {
        return workService.getWorks();
    }
    @GetMapping("/forVehicle/{id}")
    public List<Work> getWorksForAVehicle(@PathVariable Long id){
        return workService.getWorksForAVehicle(id);
    }
    @GetMapping("/{id}")
    public Optional<Work> getWork(@PathVariable Long id) {
        return workService.getWork(id);
    }
    @PostMapping
    public void addNewWork(@RequestBody Work work) {
        workService.addNewWork(work);
    }

    @PutMapping("/{id}")
    public Work updateWork(@PathVariable Long id, @RequestBody Work updatedwork) {
        return workService.updateWork(id, updatedwork);
    }

    @DeleteMapping("/{id}")
    public void deleteWork(@PathVariable Long id) {
        workService.deleteWork(id);
    }

}
