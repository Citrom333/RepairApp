package com.example.repairingapp.entities;

import com.example.repairingapp.entities.Fixture;
import com.example.repairingapp.entities.Vehicle;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Work {
    @Id
    @SequenceGenerator(
            name="vehicle_sequence",
            sequenceName = "vehicle_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "work_sequence"
    )
    @Column(
            name= "id",
            updatable = false
    )    private Long id;
    private String name;
    private String comment;
    @ManyToOne
    @JoinColumn(name = "vehicle_id", referencedColumnName = "id")
    private Vehicle vehicle;
    private Date date;
    private Integer mileage;
    @ManyToMany(mappedBy = "works")
    private List<Fixture> fixtures = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getMileage() {
        return mileage;
    }

    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    public List<Fixture> getFixtures() {
        return fixtures;
    }

    public void setFixtures(List<Fixture> fixtures) {
        this.fixtures = fixtures;
    }

    public Work( String name, String comment, Vehicle vehicle, Date date, Integer mileage, List<Fixture> fixtures) {
        this.name = name;
        this.comment = comment;
        this.vehicle = vehicle;
        this.date = date;
        this.mileage = mileage;
        this.fixtures = fixtures;
    }

    public Work() {
    }
}
