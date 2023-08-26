package com.quaestio.web;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

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
      throw new ResponseStatusException(
           HttpStatus.INTERNAL_SERVER_ERROR, error.getMessage());
    }
    session.setMaxInactiveInterval(this.sessionMaxInactiveInterval);
    String sessionId = session.getId();

    Questionaire questionaire = new Questionaire((File) tempFile.toFile());
    this.questionaires.put(sessionId, questionaire);
    QuestionaireState state = questionaire.getCurrentState();
    return (new JSONObject(state)).toString();
  }

  private Questionaire getSessionQuestionaire(HttpSession session) {
    String sessionId = session.getId();
    Questionaire questionaire = this.questionaires.get(sessionId);

    if (questionaire == null) {
      throw new ResponseStatusException(
           HttpStatus.NOT_FOUND, "Questionaire not found");
    }

    return questionaire;
  }

  @GetMapping("/continue")
  public void continueConfiguration(@RequestParam Boolean continueC, HttpSession session) {
    Questionaire questionaire = getSessionQuestionaire(session);
    questionaire.setContinueConfiguration(continueC);
  }

  @PostMapping("/answer-question")
  public String answerQuestion(@RequestBody String body, HttpSession session) {
    Questionaire questionaire = getSessionQuestionaire(session);
    JSONObject answer = new JSONObject(body);

    JSONArray answers = answer.getJSONArray("answeredFacts");
    Map<String, Boolean> answersMap = new HashMap<String, Boolean>();
    for (int i = 0; i < answers.length(); i++) {
      JSONObject answeredFact = answers.getJSONObject(i);
      String factId = answeredFact.getString("id");
      Boolean factValue = answeredFact.getBoolean("value");
      answersMap.put(factId, factValue);
    }

    questionaire.answerQuestion(answer.getString("questionId"), answersMap);
    QuestionaireState state = questionaire.getCurrentState();
    return (new JSONObject(state)).toString();
  }

  @PostMapping("/rallback-question")
  public String rollbackQuestion(@RequestBody String body, HttpSession session) {
    Questionaire questionaire = getSessionQuestionaire(session);
    JSONObject rollback = new JSONObject(body);
    
    String questionId = rollback.getString("questionId");

    questionaire.rollbackQuestion(questionId);
    QuestionaireState state = questionaire.getCurrentState();
    return (new JSONObject(state)).toString();
  }
}
