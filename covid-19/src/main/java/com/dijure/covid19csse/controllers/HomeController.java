package com.dijure.covid19csse.controllers;

import com.dijure.covid19csse.models.LocationMetrics;
import com.dijure.covid19csse.services.MetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class HomeController {

    static class Metrics {

        private final List<LocationMetrics> metrics;

        private Metrics(List<LocationMetrics> metrics) {
            this.metrics = metrics;
        }

        public List<LocationMetrics> getMetrics() {
            return Collections.unmodifiableList(metrics);
        }

        public int getTotalReportedCases() {
            return metrics.stream().mapToInt(stat -> stat.getLatestTotalCases()).sum();
        }

        public int getTotalNewCases() {
            return metrics.stream().mapToInt(stat -> stat.getDiffFromPrevDay()).sum();
        }
    }

    @Autowired
    MetricsService metricsService;

    @GetMapping("/ping")
    public String test() {

        return "OK, phew, that worked. Reported from " + getClass().getName();
    }

    @GetMapping("/metrics")
    public Metrics metrics() {
        return new Metrics(metricsService.getMetrics());
    }
}
