package com.quaestio.web;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;


@SpringBootApplication
@RestController
public class WebApplication {
	private HashMap<String, Questionaire> questionaires = new HashMap<String, Questionaire>();
  private final File uploadDir = new File("upload");
  
  @Value("${sessions.maxInactiveInterval}")
  private int sessionMaxInactiveInterval;
  
	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}

  @PostMapping("/open-questionaire")
  public String openQuestionaire(@RequestParam("uploaded_file") MultipartFile file, HttpSession session) {
    Path tempFile;
    if (!uploadDir.exists()) {
      uploadDir.mkdir();
    };

    try (InputStream input = file.getInputStream()) { // getPart needs to use same "name" as input field in form
      tempFile = Files.createTempFile(uploadDir.toPath(), "", "");
      Files.copy(input, tempFile, StandardCopyOption.REPLACE_EXISTING);
    } catch (IOException error) {
      return "Error: " + error;
    }
    session.setMaxInactiveInterval(this.sessionMaxInactiveInterval);
    String sessionId = session.getId();

    Questionaire questionaire = new Questionaire((File) tempFile.toFile());
    this.questionaires.put(sessionId, questionaire);
    return String.format("Hello %s : %s!", sessionId, questionaire.toString());
  }
}
