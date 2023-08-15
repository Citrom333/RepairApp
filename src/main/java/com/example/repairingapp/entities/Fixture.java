package com.example.repairingapp.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Fixture {
    @Id
    @SequenceGenerator(
            name="vehicle_sequence",
            sequenceName = "vehicle_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "fixture_sequence"
    )
    @Column(
            name= "id",
            updatable = false
    )
    private Long id;
    @Column(
            name= "fixture_name",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String name;
    @ManyToMany
    @JoinTable(
            name = "fixture_shop",
            joinColumns = @JoinColumn(name = "shop_id"),
            inverseJoinColumns = @JoinColumn(name = "fixture_id")
    )
    private List<Shop> shops = new ArrayList<>();
    @ManyToMany
    @JoinTable(
            name = "fixture_work",
            joinColumns = @JoinColumn(name = "work_id"),
            inverseJoinColumns = @JoinColumn(name = "fixture_id")
    )
    private List<Work> works = new ArrayList<>();

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

    public List<Shop> getShops() {
        return shops;
    }

    public void setShops(List<Shop> shops) {
        this.shops = shops;
    }

    public List<Work> getWorks() {
        return works;
    }

    public void setWorks(List<Work> works) {
        this.works = works;
    }

    public Fixture(String name) {
        this.name = name;
    }

    public Fixture() {
    }
}
