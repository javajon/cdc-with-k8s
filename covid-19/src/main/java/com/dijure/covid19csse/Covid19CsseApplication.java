package com.dijure.covid19csse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Covid19CsseApplication {

	public static void main(String[] args) {
		SpringApplication.run(Covid19CsseApplication.class, args);
	}

}
