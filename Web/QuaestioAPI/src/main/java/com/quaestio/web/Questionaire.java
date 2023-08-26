package com.quaestio.web;

import java.io.File;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import com.processconfiguration.qml.FactType;
import com.processconfiguration.qml.QuestionType;
import com.processconfiguration.quaestio.QuestionTypeListModel;

public class Questionaire extends QuestionaireBase {
	

	public Questionaire(File file) {
		super(file);
	}

	public QuestionaireState getCurrentState() {
		QuestionaireQuestion[] validQuestions = getSerializableQuestions(this.validQ);

		QuestionaireQuestion[] answeredQuestions = getSerializableQuestions(this.answeredQ);

		QuestionaireState state = new QuestionaireState(this.name, this.author, this.reference, validQuestions, answeredQuestions);
		return state;
	}

	private QuestionaireQuestion[] getSerializableQuestions(QuestionTypeListModel questionModel) {
		QuestionaireQuestion[] questions = new QuestionaireQuestion[questionModel.size()];
		for (int i = 0; i < questionModel.size(); i++) {
			QuestionType q = questionModel.get(i);
			List<String> factsList = q.getMapQFL();
			String[] facts = new String[factsList.size()];
        	facts = factsList.toArray(facts);
			QuestionaireFact[] questionaireFacts = new QuestionaireFact[facts.length];
			for (int j = 0; j < facts.length; j++) {
				FactType fact = FactsMap.get(facts[j]);
				questionaireFacts[j] = new QuestionaireFact(fact.getId(), fact.getDescription(), fact.isDefault(), fact.isMandatory(), currentS.vs.get(fact.getId()));
			}
			questions[i] = new QuestionaireQuestion(q.getId(), q.getDescription(), q.getGuidelines(), questionaireFacts);
		}
		return questions;
	}

	public void setContinueConfiguration(Boolean continueC) {
		this.continueC = continueC;
	}

	public void answerQuestion(String questionId, Map<String, Boolean> answeredFacts) {
		answeredFacts.forEach((factId, value) -> {
			currentS.vs.put(factId, value ? TRUE : FALSE);
			currentS.t.add(factId);
			this.bddc.setFact(factId, value ? "1" : "0");
		});

		QuestionType selectedQ = QuestionsMap.get(questionId);
		validQ.removeElement(selectedQ);
		currentS.qs.add(selectedQ.getId());
		states.add(new State(currentS));
		answeredQ.addElement(selectedQ);
		updateValidQ();

		allMandatoryFactsAnswered =  validQ.size() != 0 && !continueC && checkMandatoryF();
	}

	public void rollbackQuestion(String questionId) {
		QuestionType selectedQ = QuestionsMap.get(questionId);
		int pos, cState;
		String valueNEW;

		pos = states.get(states.size() - 1).qs.indexOf(selectedQ.getId());
		for (int i = states.size() - 1; i > pos; i--) {
			states.remove(i);
			answeredQ.remove(i - 1);
		}
		cState = states.size() - 1;
		currentS = new State(states.get(cState));// the last state after
													// removing
		// getJText_log().append(
		// 		"Rolled back from " + selectedQ.getId()
		// 				+ " onwards. Current state: s" + cState + ".qs: "
		// 				+ currentS.qs.toString() + "\n");

		for (String fID : currentS.vs.keySet()) {
			valueNEW = currentS.vs.get(fID);
			if (valueNEW.equals("unset"))
				bddc.setFact(fID, "u" + fID);
			else if (valueNEW.equals("true"))
				bddc.setFact(fID, "1");
			else
				bddc.setFact(fID, "0");
		}

		if (!continueC)
			checkMandatoryF();

		validQ.clear();
		updateValidQ();
	}
}
