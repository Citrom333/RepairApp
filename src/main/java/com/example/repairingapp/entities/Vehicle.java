package com.example.repairingapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity(name="Vehicle")
@Table(
        name="vehicle",
uniqueConstraints = {
              @UniqueConstraint(  name="license_plate_unique", columnNames = "license_plate")
} )
public class Vehicle {

    @Id
    @SequenceGenerator(
            name="vehicle_sequence",
            sequenceName = "vehicle_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "vehicle_sequence"
    )
    @Column(
            name= "id",
            updatable = false
    )
    private Long id;
    @Column(
            name= "license_plate",
            nullable = false,
            unique = true
    )
    private String licensePlate;
    @Column(name = "year_of_manufacture")
    private Integer yearOfManufacture;
    @Column(
            name= "brand",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String brand;
    @Column(
            name= "type",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String type;
    @JsonIgnore
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private List<Work> works = new ArrayList<>();


    public Vehicle(String licensePlate, Integer yearOfManufacture, String brand, String type) {
        this.licensePlate = licensePlate;
        this.yearOfManufacture = yearOfManufacture;
        this.brand = brand;
        this.type = type;
    }

    public Vehicle() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public Integer getYearOfManufacture() {
        return yearOfManufacture;
    }

    public void setYearOfManufacture(Integer yearOfManufacture) {
        this.yearOfManufacture = yearOfManufacture;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Work> getWorks() {
        return works;
    }
    public void setWorks(List<Work> works) {
        this.works = works;
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "id=" + id +
                ", licensePlate='" + licensePlate + '\'' +
                ", yearOfManufacture=" + yearOfManufacture +
                ", brand='" + brand + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
