package com.quaestio.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.processconfiguration.qml.QMLType;

@SpringBootApplication
@RestController
public class WebApplication {
	QMLType[] questionaires;

	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}
    @PostMapping("/open-questionaire")
    public String openQuestionaire(@RequestParam("uploaded_file") MultipartFile file, ModelMap modelMap) {
      Session session = new Session((File) file);
      return String.format("Hello %s!", file);
    }
}
