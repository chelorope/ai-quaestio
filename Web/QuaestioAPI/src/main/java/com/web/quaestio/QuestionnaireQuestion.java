package com.web.quaestio;

public class QuestionnaireQuestion {
    private String id;
    private String description;
    private String guidelines;
    private Boolean answered;
    private Boolean skippable;
    private String[] facts;

    public QuestionnaireQuestion(String id, String description, String guidelines, Boolean answered, Boolean skippable, String[] facts) {
        this.id = id;
        this.description = description;
        this.guidelines = guidelines;
        this.answered = answered;
        this.facts = facts;
        this.skippable = skippable;
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

    public Boolean getSkippable() {
        return skippable;
    }

    public String[] getFacts() {
        return facts;
    }
}
