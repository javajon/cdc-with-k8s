package com.dijure.aggregator.services;

import com.dijure.aggregator.models.Metrics;

import java.util.*;

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
        Country[] countries = restTemplate.getForObject(url, Country[].class);

        return filterUnknowns(merge(countries));
    }

    private Country[] filterUnknowns(Country[] countries) {
        List<Country> modifiableCountries = new ArrayList<>(Arrays.asList(countries));
        Iterator<Country> countryIterator = modifiableCountries.iterator();
        while(countryIterator.hasNext()) {
            Country country = countryIterator.next();
            if (country.getPopulation() == 0 || country.getLatestTotalCases() == 0) {
                countryIterator.remove();
            }
        }

        return modifiableCountries.toArray(new Country[modifiableCountries.size()]);
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
        Collections.sort(countries, (o1, o2) -> Double.compare(o2.getPercentCases(), o1.getPercentCases()));

        return countries.toArray(new Country[countries.size()]);
    }


    private Country[] merge(Country[] countries) {
        // Lazy load and cache to avoid calling public service too much.
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

    private Metrics findMetrics() {
        String url = "http://covid-19/metrics";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, Metrics.class);
    }
}
