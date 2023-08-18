package com.example.repairingapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Fixture {
    @Id
    @SequenceGenerator(
            name="fixture_sequence",
            sequenceName = "fixture_sequence",
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

    @ManyToOne
    @JoinColumn(name = "shop_id")
    private Shop shop;
@JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "fixture_work",
            joinColumns = @JoinColumn(name = "fixture_id"),
            inverseJoinColumns = @JoinColumn(name = "work_id")
    )
    private List<Work> works = new ArrayList<Work>();

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

    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public List<Work> getWorks() {
        return works;
    }

    public void setWorks(List<Work> works) {
        this.works = works;
    }

    public Fixture(String name, Shop shop) {

        this.name = name;
        this.shop =shop;
    }

    public Fixture() {
    }
}
