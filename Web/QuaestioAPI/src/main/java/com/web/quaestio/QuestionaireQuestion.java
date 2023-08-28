package com.web.quaestio;

public class QuestionaireQuestion {
    private String id;
    private String description;
    private String guidelines;
    private QuestionaireFact[] facts;

    public QuestionaireQuestion(String id, String description, String guidelines, QuestionaireFact[] facts) {
        this.id = id;
        this.description = description;
        this.guidelines = guidelines;
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

    public QuestionaireFact[] getFacts() {
        return facts;
    }
}
