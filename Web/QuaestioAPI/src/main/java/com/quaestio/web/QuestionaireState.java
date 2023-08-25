package com.quaestio.web;

public class QuestionaireState {
    private String name;
    private String author;
    private String reference;
    private QuestionaireQuestion[] questions;

    public QuestionaireState(String name, String author, String reference, QuestionaireQuestion[] questions) {
        this.name = name;
        this.author = author;
        this.reference = reference;
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

    public QuestionaireQuestion[] getQuestions() {
        return questions;
    }
}