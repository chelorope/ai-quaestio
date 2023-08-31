package com.web.quaestio;

public class QuestionaireState {
    private String name;
    private String author;
    private String reference;
    private Boolean mandatoryFactsAnswered;
    private FactsMap facts;
    private QuestionsMap questions;

    public QuestionaireState(String name, String author, String reference, Boolean mandatoryFactsAnswered, FactsMap facts, QuestionsMap questions) {
        this.name = name;
        this.author = author;
        this.reference = reference;
        this.mandatoryFactsAnswered = mandatoryFactsAnswered;
        this.facts = facts;
        this.questions = questions;
    }

    public String getName() {
        return name;
    }

    public String getAuthor() {
        return author;
    }

    public String getReference() {
        return reference;
    }

    public Boolean getMandatoryFactsAnswered() {
        return mandatoryFactsAnswered;
    }

    public FactsMap getFacts() {
        return facts;
    }

    public QuestionsMap getQuestions() {
        return questions;
    }
}