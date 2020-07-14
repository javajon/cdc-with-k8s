package com.dijure.world.pop.services;

import com.dijure.world.pop.models.City;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class CityService implements ICityService {

    @Autowired
    private JdbcTemplate jtm;

    @Override
    public List<City> findAll() {

        String sql = "SELECT * FROM city";

        return jtm.query(sql, new BeanPropertyRowMapper<>(City.class));
    }

    @Override
    public City findById(Long id) {

        String sql = "SELECT * FROM city WHERE id = ?";

        return jtm.queryForObject(sql, new Object[]{id},
                new BeanPropertyRowMapper<>(City.class));
    }
}