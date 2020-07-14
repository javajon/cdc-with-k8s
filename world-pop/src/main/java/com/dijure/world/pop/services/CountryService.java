package com.dijure.world.pop.services;

import com.dijure.world.pop.models.Country;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class CountryService implements ICountryService {

    @Autowired
    private JdbcTemplate jtm;

    @Override
    public List<Country> findAll() {

        String sql = "SELECT * FROM country";

        return jtm.query(sql, new BeanPropertyRowMapper<>(Country.class));
    }

    @Override
    public Country findById(String code) {

        String sql = "SELECT * FROM country WHERE code = ?";

        return jtm.queryForObject(sql, new Object[]{code},
                new BeanPropertyRowMapper<>(Country.class));
    }
}