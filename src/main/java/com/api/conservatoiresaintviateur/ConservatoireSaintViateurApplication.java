package com.api.conservatoiresaintviateur;

import com.api.conservatoiresaintviateur.config.CorsConfig;
import com.api.conservatoiresaintviateur.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;
// import org.springframework.context.event.EventListener;

@SpringBootApplication
@Import(CorsConfig.class)
@ComponentScan("com.api.conservatoiresaintviateur")
@EnableScheduling
public class ConservatoireSaintViateurApplication {

	@Autowired
	private EmailService service;

	public static void main(String[] args) {
		SpringApplication.run(ConservatoireSaintViateurApplication.class, args);
	}
}
