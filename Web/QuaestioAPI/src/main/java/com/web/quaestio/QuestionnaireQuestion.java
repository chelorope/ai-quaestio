package com.web.quaestio;

public class QuestionnaireQuestion {
    private String id;
    private String description;
    private String guidelines;
    private Boolean answered;
    private String[] facts;

    public QuestionnaireQuestion(String id, String description, String guidelines, Boolean answered, String[] facts) {
        this.id = id;
        this.description = description;
        this.guidelines = guidelines;
        this.answered = answered;
        this.facts = facts;
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getGuidelines() {
        return guidelines;
    }

    public Boolean getAnswered() {
        return answered;
    }

    public String[] getFacts() {
        return facts;
    }
}
