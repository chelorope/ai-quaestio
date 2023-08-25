package com.quaestio.web;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.swing.JFrame;
import javax.swing.JToggleButton;

import com.processconfiguration.bddc.ExecBDDC;
import com.processconfiguration.qml.FactType;
import com.processconfiguration.qml.QMLType;
import com.processconfiguration.qml.QuestionType;
import com.processconfiguration.quaestio.QuestionTypeListModel;

import jakarta.xml.bind.*;

public class QuestionaireBase {
	QMLType qml;
	private List<State> states = null;
	protected QuestionTypeListModel validQ = null;
	protected QuestionTypeListModel answeredQ = null;
	private HashSet<String> mandatoryF = null;
	private HashSet<String> XORquestions = null;
	private State currentS = null;
	private ExecBDDC bddc = null;
	private HashSet<String> skippedQuestions = null;

	// sets
	Map<String, FactType> FactsMap;
	Map<String, QuestionType> QuestionsMap;

	private boolean first;
	protected boolean continueC;
	private boolean showSkippableQuestions;

	public static final String TRUE = "true"; // @jve:decl-index=0:
	public static final String FALSE = "false"; // @jve:decl-index=0:
	public static final String UNSET = "unset"; // @jve:decl-index=0:

	public QuestionaireBase(File file) {
		initialize();
		qml = fromFile(file);
		readModel();
	}

	private void initialize() {
		// initiates the ListModels
		validQ = new QuestionTypeListModel();
		answeredQ = new QuestionTypeListModel();
		states = new ArrayList<State>();
		mandatoryF = new HashSet<String>();
		XORquestions = new HashSet<String>();
		skippedQuestions = new HashSet<String>();
		first = true;
		// showDef = true;
		// showMan = true;
		continueC = false;
		showSkippableQuestions = true;
	}

	private static QMLType fromFile(File fIn) {
		try {
			JAXBContext jc = JAXBContext
					.newInstance("com.processconfiguration.qml");
			Unmarshaller u = jc.createUnmarshaller();
			JAXBElement qmlElement = (JAXBElement) u
					.unmarshal(fIn); // creates the root element
										// from XML file
			return (QMLType) qmlElement.getValue();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	private void readModel() {
		if (!first) {// clear everything if it isn't the first time
			states.clear();// clear the states list
			validQ.clear();// clear validQ JList
			answeredQ.clear();// clear answeredQ JLis
			mandatoryF.clear();// clear the set of mandatory facts
			XORquestions.clear();// clear the set of XOR questions
			currentS.vs.clear();
			currentS.t.clear();
			currentS.f.clear();
			currentS.qs.clear();
			// TODO: Disable export option on the frontned, a configuration cannot be exported if just opened
			
			continueC = false;
			QuestionsMap.clear();// clear the questions
			FactsMap.clear();// clear the facts
		}
		// jLabel_info.setText("Name: " + qml.getName());// to print the name of
		// 												// the model
		// jLabel_info2.setText("Author: " + qml.getAuthor());// to print the
		// 													// author
		// jLabel_info3.setText("Reference: " + qml.getReference());// to print the
		// 															// reference

		createSets();// initializes QuestionsMap and FactsMap
		// creates a temp state used by the algorithm
		currentS = new State(FactsMap.keySet());
		states.add(new State(FactsMap.keySet()));// stores s_init in the states
													// list
		// TODO: use threads
		// Thread rct= new ReadCThread(cm);
		// rct.start();
		initBDDC();
		retrieveMandatoryF();
		retrieveXORQ();
		if (mandatoryF.size() == 0) {
			// getJDialog_AskToContinue().setVisible(true);
		} else
			updateValidQ();// start configuring
		first = false;
	}

	private void createSets() {
		QuestionsMap = new TreeMap<String, QuestionType>();
		for (QuestionType q : qml.getQuestion()) {
			q.setMapQFL(q.getMapQF());
			q.setPreQL();
			QuestionsMap.put(q.getId(), q);
		}

		FactsMap = new TreeMap<String, FactType>();
		for (FactType f : qml.getFact()) {
			f.setPreFL();
			FactsMap.put(f.getId(), f);
		}
	}

	private void initBDDC() {// sets the conjunctive normal form output +
								// initializes the facts variables with "u+fID"
		StringBuffer init = new StringBuffer("set cnf;\n");
		for (String fID : FactsMap.keySet()) {
			init.append(fID + " := u" + fID.substring(1) + "; ");
		}

		bddc = new ExecBDDC(qml.getConstraints());// launches the process bddc
													// for constraints checking
		bddc.init(init.toString());// initiates the bddc variables with empty
									// arguments
	}

	private void retrieveMandatoryF() {
		for (FactType currentF : FactsMap.values()) {
			if (currentF.isMandatory()) {
				mandatoryF.add(currentF.getId());
			}
		}
	}

	private void retrieveXORQ() {
		for (QuestionType currentQ : QuestionsMap.values()) {
			if (bddc.isXOR(currentQ.getMapQFL())) {
				XORquestions.add(currentQ.getId());
			}
		}
	}

	private void updateValidQ() {// set the validQ for the current state
		QuestionType precedingQ;
		// The file has been already open. Note that validQ has already been
		// initialized as an empty DefaultListModel in initiate()
		boolean isValid;
		for (QuestionType currentQ : QuestionsMap.values()) {
			isValid = false;
			if (!currentS.qs.contains(currentQ.getId())) {// currentQ not
															// answered - we
															// need also to
															// check the
															// questions already
															// valid (WHY???)
				// NOTE: same as answeredQ.contains(currentQ)
				// PERFORMANCES: we can avoid checking among the valid
				// questions: add "!validQ.contains(currentQ)" now
				for (List<String> currentPreQ : currentQ.getPreQL()) {
					if (currentPreQ.size() == 0) {// preQElement doesn't contain
													// any QRef -> no
													// preconditions -> currentQ
													// is a valid question
						isValid = true;
						break;
					}
					for (String currentQRef : currentPreQ) {
						precedingQ = QuestionsMap.get(currentQRef);
						if (currentS.qs.contains(precedingQ.getId()))
							// NOTE: same as answeredQ.contains(currentQ)
							isValid = true;
						else {
							isValid = false;
							break;
						}
					}
					if (isValid)
						break;// if it is valid no need to check the other preQ
								// (also if there's just one)

				}// end for currentPreQ
				if (isValid) {
					if (!skippable(currentQ)) {// a question is added to the
												// Valid Questions List if it
												// hasn't been added yet and is
												// not skippable
						currentQ.setSkippable(false);// may be too much, but
														// should work
						skippedQuestions.remove(currentQ.getId());// tries to
																	// remove
																	// the
																	// question
																	// in case
																	// it was
																	// skippable
																	// before
						if (!validQ.contains(currentQ)) {
							validQ.addElement(currentQ);
						}
					} else {// if valid but skippable, don't show and put in the
							// answered questions
						currentQ.setSkippable(true);
						skippedQuestions.add(currentQ.getId());
						if (validQ.contains(currentQ))// if the question was
														// already shown in the
														// Valid Questions list
														// and now has turned
														// out to be skippable
							validQ.removeElement(currentQ);
						currentS.qs.add(currentQ.getId());// register the
															// question just
															// answered. Note:
															// this will be
															// always considered
															// answered,
															// although skipped
															// questions are set
															// not to be
															// visible.
						states.add(new State(currentS));// creates a new state
														// with the info of
														// currentS and stores
														// it in the states list
						if (showSkippableQuestions)
							answeredQ.addElement(currentQ);
					}
				} else if (skippable(currentQ)) {// even if it is not valid but
													// skippable, add to the
													// skipped questions, so
													// that it can be
													// automatically answered
													// when the question becomes
													// valid
					currentQ.setSkippable(true);
					skippedQuestions.add(currentQ.getId());// add to
															// skippedQuestions
															// anyway
				}
				isValid = false;
			}
		}// end for currentQ
	}

	private boolean skippable(QuestionType currentQ) {
		FactType currentF;
		int forceable;
		boolean skippable = true;

		for (String currentFID : currentQ.getMapQFL()) {// for each fact in the
														// question
			currentF = retrieveFact(currentFID);
			String currentFValue = currentS.vs.get(currentF.getId());// the fact
																		// is
																		// always
																		// contained
			// TODO: verify why XOR facts are left UNSET
			// System.out.println(currentFID+": "+currentFValue);

			// for each unset fact, the method checks whether it can be forced
			// to a value, given the constraints and the answers given so far
			if (currentFValue.equals(UNSET)) {// the fact is still unset. CAN
												// THIS BIAS THE SKIPPABILITY OF
												// A QUESTION?

				if ((forceable = bddc.isForceable(currentF.getId())) == 1) {// forceable
																			// to
																			// true:
																			// vs
																			// and
																			// t
																			// need
																			// to
																			// be
																			// updated
					currentS.vs.put(currentF.getId(), TRUE);// update vs and t
					currentS.t.add(currentF.getId());
					bddc.setFact(currentF.getId(), "1");
				} else if (forceable == -1) {// forceable to false
					currentS.vs.put(currentF.getId(), FALSE);// update vs and f:
																// vs and t
																// needs to be
																// updated
					currentS.f.add(currentF.getId());
					bddc.setFact(currentF.getId(), "0");
				} else
					// if at least a fact cannot be forced, then the question is
					// not skippable
					skippable = false;
			}
		}
		return skippable;
	}

	private FactType retrieveFact(String fID) {
		return FactsMap.get(fID);
	}
	

	public String toString() {
		return qml.toString();
	}
}
