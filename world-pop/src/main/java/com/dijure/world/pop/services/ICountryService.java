package com.dijure.world.pop.services;

import com.dijure.world.pop.models.Country;
import java.util.List;

public interface ICountryService {

    List<Country> findAll();
    Country findById(String code);
}