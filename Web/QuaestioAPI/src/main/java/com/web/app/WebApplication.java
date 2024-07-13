package com.web.app;

import com.web.quaestio.Questionnaire;
import com.web.quaestio.QuestionnaireState;


import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpSession;


@SpringBootApplication
@CrossOrigin(origins = "${client.url}", maxAge = 3600, allowCredentials = "true")
@RestController
public class WebApplication {
	private HashMap<String, Questionnaire> questionnaires = new HashMap<String, Questionnaire>();
  private final File uploadDir = new File("upload");
  
  @Value("${sessions.maxInactiveInterval}")
  private int sessionMaxInactiveInterval;
  
	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}

  private Questionnaire getSessionQuestionnaire(HttpSession session) {
    String sessionId = session.getId();
    Questionnaire questionnaire = this.questionnaires.get(sessionId);

    if (questionnaire == null) {
      throw new ResponseStatusException(
           HttpStatus.NOT_FOUND, "Questionnaire not found");
    }

    return questionnaire;
  }

  @GetMapping("/")
  public String getQuestionnaireState(HttpSession session) {
    Questionnaire questionnaire = getSessionQuestionnaire(session);
    QuestionnaireState state = questionnaire.getCurrentState();
    return (new JSONObject(state)).toString();
  }

  @PostMapping("/open")
  public String openQuestionnaire(@RequestParam("uploaded_file") MultipartFile file, HttpSession session) {
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

    Questionnaire questionnaire = new Questionnaire((File) tempFile.toFile());
    this.questionnaires.put(sessionId, questionnaire);
    QuestionnaireState state = questionnaire.getCurrentState();
    return (new JSONObject(state)).toString();
  }

  @GetMapping("/continue")
  public void continueConfiguration(HttpSession session) {
    Questionnaire questionnaire = getSessionQuestionnaire(session);
    questionnaire.setContinueConfiguration();
  }

  @GetMapping("/complete")
  public String completeQuestionnaire(HttpSession session) {
    Questionnaire questionnaire = getSessionQuestionnaire(session);
    questionnaire.completeWithDefaults();
    QuestionnaireState state = questionnaire.getCurrentState();
    return (new JSONObject(state)).toString();
  }

  @GetMapping(value = "/export", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
  public Resource exportDCL(HttpSession session) {
    try {
    Questionnaire questionnaire = getSessionQuestionnaire(session);
    Path path = Paths.get(questionnaire.exportDCL().toURI());
    ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
    return resource;
    } catch (Exception error) {
      throw new ResponseStatusException(
           HttpStatus.INTERNAL_SERVER_ERROR, error.getMessage());
    }
  }

  @PostMapping("/question/answer")
  public String answerQuestion(@RequestBody String body, HttpSession session) {
    Questionnaire questionnaire = getSessionQuestionnaire(session);
    JSONObject answer = new JSONObject(body);

    JSONArray answers = answer.getJSONArray("answeredFacts");
    Map<String, Boolean> answersMap = new HashMap<String, Boolean>();
    for (int i = 0; i < answers.length(); i++) {
      JSONObject answeredFact = answers.getJSONObject(i);
      String factId = answeredFact.getString("id");
      Boolean factValue = answeredFact.getBoolean("value");
      answersMap.put(factId, factValue);
    }

    questionnaire.answerQuestion(answer.getString("questionId"), answersMap);
    QuestionnaireState state = questionnaire.getCurrentState();
    return (new JSONObject(state)).toString();
  }

  @PostMapping("/question/rollback")
  public String rollbackQuestion(@RequestBody String body, HttpSession session) {
    Questionnaire questionnaire = getSessionQuestionnaire(session);
    JSONObject rollback = new JSONObject(body);
    
    String questionId = rollback.getString("questionId");

    questionnaire.rollbackQuestion(questionId);
    QuestionnaireState state = questionnaire.getCurrentState();
    return (new JSONObject(state)).toString();
  }
}
