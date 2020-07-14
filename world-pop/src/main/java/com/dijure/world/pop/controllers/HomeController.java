package com.dijure.world.pop.controllers;

import com.dijure.world.pop.models.City;
import com.dijure.world.pop.services.ICityService;
import com.dijure.world.pop.models.Country;
import com.dijure.world.pop.services.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    @Autowired
    private ICityService cityService;

    @Autowired
    private ICountryService countryService;

    @GetMapping("/ping")
    public String test() {

        return "OK, phew, that worked. Reported from " + getClass().getName();
    }

    @GetMapping("/cities")
    public List<City> findCities() {

        return cityService.findAll();
    }

    @GetMapping("/cities/{cityId}")
    public City findCity(@PathVariable Long cityId) {

        return cityService.findById(cityId);
    }

    @GetMapping("/countries")
    public List<Country> findCountries() {

        return countryService.findAll();
    }

    @GetMapping("/countries/{countryCode}")
    public Country findCountry(@PathVariable String countryCode) {

        return countryService.findById(countryCode);
    }

    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity<String> noEntryFound(EmptyResultDataAccessException e) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No entry found.");
    }
}
