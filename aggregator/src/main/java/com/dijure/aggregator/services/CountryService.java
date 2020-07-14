package com.dijure.aggregator.services;

import com.dijure.aggregator.models.Metrics;
import com.fasterxml.jackson.databind.introspect.ConcreteBeanPropertyBase;

import java.util.Arrays;
import java.util.List;
import java.util.Collections;
import java.util.Comparator;

import com.dijure.aggregator.models.Country;
import com.dijure.aggregator.models.LocationMetrics;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CountryService {

    private Metrics metrics = new Metrics();

    public Country[] findAll() {
        String url = "http://world-pop/countries";
        RestTemplate restTemplate = new RestTemplate(); 
        Country[] countries = restTemplate.getForObject( url, Country[].class);

        return merge(countries);
    }

    public Country findById(String code) {

        for (Country country : findAll()) {
            if (country.getCode().equalsIgnoreCase(code)) {
                return country;
            }
        }

        return new Country();
    }

    /** Highest cases per capita. */
    public Country[] perCapita() {
        List<Country> countries = Arrays.asList(findAll());
        Collections.sort(countries, new Comparator<Country>() {
            @Override
            public int compare(Country o1, Country o2) {
                return Double.compare(o2.getPercentCases(), o1.getPercentCases());
            }
        });

        return countries.toArray(new Country[countries.size()]);
    }


    private Country[] merge(Country[] countries) {
        if (metrics.getMetrics().isEmpty()) {
            metrics = findMetrics();
        }

        for (Country country : countries) {
            merge(country);
        }

        return countries;
    }

    private void merge(Country country) {
        for (LocationMetrics metric : metrics.getMetrics()) {
            if (metric.getCountry().equalsIgnoreCase(country.getName())) {
                country.setLatestTotalCases(metric.getLatestTotalCases());
                country.setDiffFromPrevDay(metric.getDiffFromPrevDay());
                break;
            }
        }
    }

    private Metrics findMetrics()
    {
        String url = "http://covid-19/metrics";
        RestTemplate restTemplate = new RestTemplate(); 
        return restTemplate.getForObject( url, Metrics.class);
    }
}
