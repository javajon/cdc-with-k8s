package com.dijure.aggregator.models;

import java.util.Collections;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Metrics {

        private List<LocationMetrics> metrics = Collections.emptyList();
        private int totalReportedCases;
        private int totalNewCases;

        public Metrics() {
        }
    
        private Metrics(List<LocationMetrics> metrics, int totalReportedCases, int totalNewCases ) {
            this.metrics = metrics;
            this.totalReportedCases = totalReportedCases;
            this.totalNewCases = totalNewCases;
        }

        public void setMetrics(List<LocationMetrics> metrics) {
            this.metrics = metrics;
        }

        public List<LocationMetrics> getMetrics() {
            return metrics;
        }

        public void setTotalReportedCases(int cases) {
            this.totalReportedCases = cases;
        }

        public int getTotalReportedCases() {
            return totalReportedCases;
        }

        public void setTotalNewCases(int cases) {
            this.totalNewCases = cases;
        }

        public int getTotalNewCases() {
            return totalNewCases;
        }
    }
