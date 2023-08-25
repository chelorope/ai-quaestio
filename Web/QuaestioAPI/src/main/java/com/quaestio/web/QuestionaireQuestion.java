package com.quaestio.web;

public class QuestionaireQuestion {
    private String description;
    private String guidelines;
    private QuestionaireFact[] facts;

    public QuestionaireQuestion(String description, String guidelines, QuestionaireFact[] facts) {
        this.description = description;
        this.guidelines = guidelines;
        this.facts = facts;
    }

    public String getDescription() {
        return description;
    }

    public String getGuidelines() {
        return guidelines;
    }

    public QuestionaireFact[] getFacts() {
        return facts;
    }
}
