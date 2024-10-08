package com.web.quaestio;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.processconfiguration.dcl.DCL;
import com.processconfiguration.qml.FactType;
import com.processconfiguration.qml.QuestionType;
import com.processconfiguration.quaestio.QuestionTypeListModel;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.Marshaller;

public class Questionnaire extends QuestionnaireBase {
	

	public Questionnaire(File file) {
		super(file);
	}

	public QuestionnaireState getCurrentState() {
		QuestionsMap questions = getSerializableQuestions(this.validQ, false);
		questions.putAll(getSerializableQuestions(this.answeredQ, true));
		FactsMap facts = getSerializableFacts(questions);

		QuestionnaireState state = new QuestionnaireState(this.name, this.author, this.reference, this.allMandatoryFactsAnswered, facts, questions);
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
			questions.put(q.getId(), new QuestionnaireQuestion(q.getId(), q.getDescription(), q.getGuidelines(), answered, q.isSkippable(), facts));
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
				facts.put(factId, new QuestionnaireFact(fact.getId(), fact.getDescription(), fact.isDefault(), fact.isMandatory(), currentS.vs.get(fact.getId()) == TRUE));
			}
		});
		return facts;
	}

	public void setContinueConfiguration() {
		this.continueC = true;
		this.allMandatoryFactsAnswered = false;
	}

	public void completeWithDefaults() {
		tempS = new State(currentS);
		for (QuestionType currentQ : QuestionsMap.values()) {
			if (!answeredQ.contains(currentQ)) {
				giveDefAnswer(currentQ, true);
				currentS = tempS;
				currentS.qs.add(currentQ.getId());
				// getJText_log().append(
				// 		"s" + states.size() + ".qs: "
				// 				+ currentS.qs.toString() + "\n");
				states.add(new State(currentS));
				answeredQ.addElement(currentQ);
			}
		}
		validQ.removeAllElements();
		// getJText_log()
		// 		.append("Configuration process completed with default values.\n");
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

	public File exportDCL() {
		FactType factQML;
		File fInConf = new File("");
		try {
			DCL dcl = new DCL();
			dcl.setAuthor(qml.getAuthor());
			dcl.setName(qml.getName());
			dcl.setReference(qml.getReference());
			for (Entry<String, String> fact : currentS.vs.entrySet()) {
				factQML = FactsMap.get(fact.getKey());
				com.processconfiguration.dcl.FactType factDCL = new com.processconfiguration.dcl.FactType();
				factDCL.setDescription(factQML.getDescription());
				factDCL.setId(factQML.getId());
				factDCL.setValue(Boolean.parseBoolean(fact.getValue()));
				if (factQML.isDefault() == Boolean
						.parseBoolean(fact.getValue()))
					factDCL.setDeviates(false);
				else
					factDCL.setDeviates(true);
				dcl.getFact().add(factDCL);
			}
			// create temporary file
			fInConf = File.createTempFile("temp", ".dcl");
			JAXBContext jaxbcontext = JAXBContext
					.newInstance("com.processconfiguration.dcl");
			Marshaller marshaller = jaxbcontext.createMarshaller();
			marshaller.marshal(dcl, fInConf);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return fInConf;
	}
}
