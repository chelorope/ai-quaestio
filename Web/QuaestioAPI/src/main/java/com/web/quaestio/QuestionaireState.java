package com.web.quaestio;

public class QuestionaireState {
    private String name;
    private String author;
    private String reference;
    private QuestionaireQuestion[] validQuestions;
    private QuestionaireQuestion[] answeredQuestions;
    private Boolean mandatoryFactsAnswered;


    public QuestionaireState(String name, String author, String reference, Boolean mandatoryFactsAnswered, QuestionaireQuestion[] validQuestions, QuestionaireQuestion[] answeredQuestions) {
        this.name = name;
        this.author = author;
        this.reference = reference;
        this.mandatoryFactsAnswered = mandatoryFactsAnswered;
        this.validQuestions = validQuestions;
        this.answeredQuestions = answeredQuestions;
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

    public QuestionaireQuestion[] getValidQuestions() {
        return validQuestions;
    }

    public QuestionaireQuestion[] getAnsweredQuestions() {
        return answeredQuestions;
    }

    public Boolean getMandatoryFactsAnswered() {
        return mandatoryFactsAnswered;
    }
}