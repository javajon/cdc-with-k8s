package com.dijure.world.pop.services;

import com.dijure.world.pop.models.City;
import java.util.List;

public interface ICityService {

    List<City> findAll();
    City findById(Long id);
}