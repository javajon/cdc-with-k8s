package com.dijure.aggregator.models;

import java.util.StringJoiner;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Country {

    private String code;
    private String name;
    private int population;
    private int latestTotalCases;
    private int diffFromPrevDay;

    public Country() {
    }

    public Country(String code, String name, int population, int latestTotalCases, int diffFromPrevDay) { 
        this.code = code;
        this.name = name;
        this.population = population;
        this.latestTotalCases = latestTotalCases;
        this.diffFromPrevDay = diffFromPrevDay;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }

    public int getLatestTotalCases() {
        return latestTotalCases;
    }

    public void setLatestTotalCases(int latestTotalCases) {
        this.latestTotalCases = latestTotalCases;
    }

    public int getDiffFromPrevDay() {
        return diffFromPrevDay;
    }

    public void setDiffFromPrevDay(int diffFromPrevDay) {
        this.diffFromPrevDay = diffFromPrevDay;
    }

    public double getPercentCases() {
        return population == 0 ? 0.0 : (double)latestTotalCases / (double)population;
    }


    @Override
    public String toString() {
        return new StringJoiner(", ", Country.class.getSimpleName() + "[", "]").add("code=" + code)
                .add("name='" + name + "'").add("population=" + population).add("latestTotalCases=" + latestTotalCases)
                .add("diffFromPrevDay=" + diffFromPrevDay).toString();
    }
}