package com.quaestio.web;

import java.io.File;
import java.util.Enumeration;

import com.processconfiguration.qml.QuestionType;

public class Questionaire extends QuestionaireBase {
	

	public Questionaire(File file) {
		super(file);
	}

	public String[] getCurrentState() {
		String[] questions = new String[this.validQ.size()];
		for (int i = 0; i < this.validQ.size(); i++) {
			QuestionType q = this.validQ.get(i);
			questions[i] = q.getDescription();
			// q.getMapQFL();
			// q.getDescription();
			// q.getGuidelines();
		}
		return questions;
	}
}
