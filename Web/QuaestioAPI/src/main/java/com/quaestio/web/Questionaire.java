package com.quaestio.web;

import java.io.File;
import java.util.Enumeration;
import java.util.List;

import com.processconfiguration.qml.FactType;
import com.processconfiguration.qml.QuestionType;

public class Questionaire extends QuestionaireBase {
	

	public Questionaire(File file) {
		super(file);
	}

	public QuestionaireState getCurrentState() {
		QuestionaireQuestion[] questions = new QuestionaireQuestion[this.validQ.size()];
		for (int i = 0; i < this.validQ.size(); i++) {
			QuestionType q = this.validQ.get(i);
			List<String> factsList = q.getMapQFL();
			String[] facts = new String[factsList.size()];
        	facts = factsList.toArray(facts);
			QuestionaireFact[] questionaireFacts = new QuestionaireFact[facts.length];
			for (int j = 0; j < facts.length; j++) {
				FactType fact = FactsMap.get(facts[j]);
				questionaireFacts[j] = new QuestionaireFact(fact.getDescription(), fact.isDefault(), fact.isMandatory());
			}
			questions[i] = new QuestionaireQuestion(q.getDescription(), q.getGuidelines(), questionaireFacts);
		}
		QuestionaireState state = new QuestionaireState(this.name, this.author, this.reference, questions);
		return state;
	}
}
