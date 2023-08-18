package com.example.repairingapp.services;
import com.example.repairingapp.entities.Work;
import com.example.repairingapp.repositories.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkService {
    private WorkRepository workRepository;
    @Autowired
    public WorkService(WorkRepository workRepository) {
        this.workRepository = workRepository;
    }
    public List<Work> getWorks() {
        return workRepository.findAll();
    }
    public List<Work> getWorksForAVehicle(Long vehicleId) {
        List<Work> allWorks= workRepository.findAll();
        var result = new ArrayList<Work>();

        for (Work work: allWorks) {

            if (work.getVehicle().getId()==vehicleId) {

                result.add(work);
            }
        }
        return result;
    }

    public void AddNewWork(Work work) {
         workRepository.save(work);
    }

    public Work updateWork(Long id, Work updatedWork) {
        Work existingWork = workRepository.findById(id).orElse(null);
        if (existingWork != null) {

            existingWork.setName(updatedWork.getName());
            existingWork.setComment(updatedWork.getComment());
            existingWork.setVehicle(updatedWork.getVehicle());
            existingWork.setFixtures(updatedWork.getFixtures());
            existingWork.setDate(updatedWork.getDate());
            existingWork.setMileage(updatedWork.getMileage());
            // Update other properties as needed
            return workRepository.save(existingWork);
        }
        return null; // Vehicle not found
    }

    public void deleteWork(Long id) {
        workRepository.deleteById(id);
    }

    public Optional<Work> getWork(Long id) {
        return workRepository.findById(id);
    }
}