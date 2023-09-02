package com.web.quaestio;

import java.io.File;
import java.util.Enumeration;
import java.util.HashMap;
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
		QuestionsMap questions = getSerializableQuestions(this.validQ, false);
		questions.putAll(getSerializableQuestions(this.answeredQ, true));
		FactsMap facts = getSerializableFacts(questions);

		QuestionaireState state = new QuestionaireState(this.name, this.author, this.reference, this.allMandatoryFactsAnswered, facts, questions);
		return state;
	}

	// Only return visible questions
	private QuestionsMap getSerializableQuestions(QuestionTypeListModel questionModel, Boolean answered) {
		QuestionsMap questions = new QuestionsMap();
		for (int i = 0; i < questionModel.size(); i++) {
			QuestionType q = questionModel.get(i);
			List<String> factsList = q.getMapQFL();
			String[] facts = new String[factsList.size()];
        	facts = factsList.toArray(facts);
			questions.put(q.getId(), new QuestionaireQuestion(q.getId(), q.getDescription(), q.getGuidelines(), answered, facts));
		}
		return questions;
	}
	
	// Only return visible facts
	private FactsMap getSerializableFacts(QuestionsMap questions) {
		FactsMap facts = new FactsMap();
		questions.forEach((questionId, question) -> {
			String[] questionFacts = question.getFacts();
			for (int i = 0; i < questionFacts.length; i++) {
				String factId = questionFacts[i];
				FactType fact = FactsMap.get(factId);
				facts.put(factId, new QuestionaireFact(fact.getId(), fact.getDescription(), fact.isDefault(), fact.isMandatory(), currentS.vs.get(fact.getId()) == TRUE));
			}
		});
		return facts;
	}

	public void setContinueConfiguration(Boolean continueC) {
		this.continueC = continueC;
		this.allMandatoryFactsAnswered = false;
	}

	public void answerQuestion(String questionId, Map<String, Boolean> answeredFacts) {
		answeredFacts.forEach((factId, value) -> {
			this.currentS.vs.put(factId, value ? TRUE : FALSE);
			this.currentS.t.add(factId);
			this.bddc.setFact(factId, value ? "1" : "0");
		});

		QuestionType selectedQ = QuestionsMap.get(questionId);
		this.validQ.removeElement(selectedQ);
		this.currentS.qs.add(selectedQ.getId());
		this.states.add(new State(this.currentS));
		this.answeredQ.addElement(selectedQ);
		updateValidQ();

		this.allMandatoryFactsAnswered =  this.validQ.size() != 0 && !this.continueC && checkMandatoryF();
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
