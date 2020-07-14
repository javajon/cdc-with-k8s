package com.dijure.covid19csse.services;

import com.dijure.covid19csse.models.LocationMetrics;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.StringReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class MetricsService {

    @Value("${virus.data.url}")
    private String virusDataUrl;

    private List<LocationMetrics> metrics = Collections.emptyList();

    public List<LocationMetrics> getMetrics() {
        return Collections.unmodifiableList(metrics);
    }

    @PostConstruct
    @Scheduled(cron = "* * 1 * * *")
    public void fetchVirusMetrics() throws IOException, InterruptedException {

        Iterable<CSVRecord> records = readMetrics();

        List<LocationMetrics> latestMetrics = new ArrayList<>();
        records.forEach(entry -> latestMetrics.add(extractMetric(entry)));

        metrics = latestMetrics;
    }

    private LocationMetrics extractMetric(CSVRecord record) {
        LocationMetrics metricsPerLocation = new LocationMetrics();

        metricsPerLocation.setState(record.get("Province/State"));
        metricsPerLocation.setCountry(record.get("Country/Region"));
        int latestCases = Integer.parseInt(record.get(record.size() - 1));
        int prevDayCases = Integer.parseInt(record.get(record.size() - 2));
        metricsPerLocation.setLatestTotalCases(latestCases);
        metricsPerLocation.setDiffFromPrevDay(latestCases - prevDayCases);

        return metricsPerLocation;
    }

    private Iterable<CSVRecord> readMetrics() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(virusDataUrl))
                .build();
        StringReader in = new StringReader(client.send(request, HttpResponse.BodyHandlers.ofString()).body());
        return CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(in);
    }
}