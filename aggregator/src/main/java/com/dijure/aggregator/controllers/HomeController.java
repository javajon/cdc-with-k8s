package com.dijure.aggregator.controllers;

import com.dijure.aggregator.models.Country;
import com.dijure.aggregator.services.CountryService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    private CountryService countryService = new CountryService();

    @GetMapping("/ping")
    public String test() {

        return "OK, phew, that worked. Reported from " + getClass().getName();
    }

    @GetMapping("/countries")
    public Country[] findCountries() {

        return countryService.findAll();
    }

    @GetMapping("/countries/{countryCode}")
    public Country findCountry(@PathVariable String countryCode) {

        return countryService.findById(countryCode);
    }

    @GetMapping("/percapita")
    public Country[] perCapita() {
        return countryService.perCapita();
    }
}
