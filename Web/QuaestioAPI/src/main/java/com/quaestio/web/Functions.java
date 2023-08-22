package com.quaestio.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import javax.swing.JFrame;
import javax.swing.JToggleButton;

import com.processconfiguration.bddc.ExecBDDC;
import com.processconfiguration.qml.FactType;
import com.processconfiguration.qml.QuestionType;
import com.processconfiguration.quaestio.QuestionTypeListModel;

public class Functions {
    Map<String, QuestionType> QuestionsMap;

    private void initialize() {
		// initiates the ListModels
		validQ = new QuestionTypeListModel();
		answeredQ = new QuestionTypeListModel();
		states = new ArrayList<State>();
		buttonsList = new HashMap<String, JToggleButton>();
		mandatoryF = new HashSet<String>();
		XORquestions = new HashSet<String>();
		skippedQuestions = new HashSet<String>();
		first = true;
		showDef = true;
		showMan = true;
		continueC = false;
		showSkippableQuestions = true;
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setIconImage(Toolkit.getDefaultToolkit().getImage(
				getClass().getResource("/icons/Q4.gif")));
		this.setLocation(new java.awt.Point(100, 100));
		this.setMinimumSize(new java.awt.Dimension(800, 600));
		this.setSize(826, 600);
		this.setJMenuBar(getJJMenuBar());
		this.setContentPane(getJContentPane());
		this.setTitle("Synergia - Quaestio v. 0.9");
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
		// bddc.init("init");
	}

	private void readModel() {
		if (!first) {// clear everything if it isn't the first time
			states.clear();// clear the states list
			validQ.clear();// clear validQ JList
			answeredQ.clear();// clear answeredQ JList
			buttonsList.clear();// clear the buttonList (this is necessary
								// because an user can end a configuraiton
								// without ansering all the questions)
			mandatoryF.clear();// clear the set of mandatory facts
			XORquestions.clear();// clear the set of XOR questions
			currentS.vs.clear();
			currentS.t.clear();
			currentS.f.clear();
			currentS.qs.clear();
			getExportMenuItem().setEnabled(false);// a configuration cannot be
													// exported if just open
			cleanQInspector();
			if (getJDialog_FI().isVisible())
				cleanFInspector();
			continueC = false;
			QuestionsMap.clear();// clear the questions
			FactsMap.clear();// clear the facts
		}
		jLabel_info.setText("Name: " + qml.getName());// to print the name of
														// the model
		jLabel_info2.setText("Author: " + qml.getAuthor());// to print the
															// author
		jLabel_info3.setText("Reference: " + qml.getReference());// to print the
																	// reference

		createSets();// initializes QuestionsMap and FactsMap

		currentS = new State(FactsMap.keySet());// creates a temp state used by
												// the algorithm
		getJText_log().append(
				"s" + states.size() + ".qs: " + currentS.qs.toString() + "\n");// updates
																				// log
																				// (done
																				// before
																				// updating
																				// list
																				// states,
																				// so
																				// as
																				// to
																				// get
																				// the
																				// correct
																				// state
																				// number
																				// starting
																				// from
																				// 0=s_init)
		states.add(new State(FactsMap.keySet()));// stores s_init in the states
													// list
		// TODO: use threads for showing a progress bar while loading the
		// constraints into memory
		// Thread rct= new ReadCThread(cm);
		// rct.start();
		initBDDC();
		retrieveMandatoryF();
		retrieveXORQ();
		if (mandatoryF.size() == 0) {
			getJDialog_AskToContinue().setVisible(true);
		} else
			updateValidQ();// start configuring
		first = false;
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
				for (List<String> currentPreQ : currentQ.getPreQL()) {// at
																		// least
																		// one
																		// PreQElement
																		// must
																		// exist
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
						getJText_log().append(
								currentQ.getId() + " is skippable\n");
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
						getJText_log().append(
								"s" + states.size() + ".qs: "
										+ currentS.qs.toString() + "\n");// updates
																			// log
																			// (done
																			// before
																			// updating
																			// list
																			// states,
																			// so
																			// as
																			// to
																			// get
																			// the
																			// correct
																			// state
																			// number
																			// starting
																			// from
																			// 0=s_init)
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


    // this method checks if currentQ is skippable. If yes, it returns true,
	// else false.
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

    protected void updateSkippableQuestions(boolean showSkippableQuestions) {
		// TODO: when a question is rolled back if another question being
		// skippable is rolled back as well, this is still shown in gray in the
		// Valid Questions list. Why???
		QuestionType currentQ;
		for (String qID : skippedQuestions) {
			currentQ = QuestionsMap.get(qID);
			if (showSkippableQuestions) {
				currentQ.setSkippable(true);
				answeredQ.addElement(currentQ);
			} else
				answeredQ.removeElement(currentQ);
		}
		if (!showSkippableQuestions)// this is used to avoid showing an
									// inconstistent Question Inspector if the
									// item selected in the Answered Questions
									// List was a skipped question now being
									// removed
			getJList_answeredQ().setSelectedIndex(
					getJList_answeredQ().getLastVisibleIndex());
	}


    // this method tries to give the default answer to an input question and
	// returns true if the default answer can be given, otherwise it returns
	// false
	// NOTE: this method could be replaced by compl(s) and done just for the
	// unset facts so far, without looking at the questions
	protected boolean giveDefAnswer(QuestionType currentQ, boolean skipCheckConf) {

		for (String fID : currentQ.getMapQFL()) {
			if (retrieveFact(fID).isDefault()) {// if the other facts have not
												// been set yet
				if ((tempS.vs.get(fID)).equals(UNSET)) {// just for facts that
														// appear in the
														// question for the
														// first time
					tempS.vs.put(fID, TRUE);// update vs and t
					tempS.t.add(fID);
				}
				// else if (tempS.vs.get(fID).equals(FALSE))
				// return false;//it deviates, the default setting cannot be
				// applied
			} else {// is false by default
				if ((tempS.vs.get(fID)).equals(UNSET)) {// just for facts that
														// appear in the
														// question for the
														// first time
					tempS.vs.put(fID, FALSE);// update vs and t
					tempS.f.add(fID);
				}
				// else if (tempS.vs.get(fID).equals(TRUE))
				// return false;//it deviates, the default setting cannot be
				// applied
			}
		}
		if (!skipCheckConf) {// not needed the second time, i.e. when users have
								// chosen to stop the configuation process,
								// because the checking has been done previously
								// by checkApplicabilityDef
			if (!bddc.isViolated(tempS.vs)) {// removed buttonsList.keySet() as
												// paramenter
				getJText_log().append(
						currentQ.getId()
								+ " can be answered with default values.\n");
				tempAQ.addElement(currentQ);
				return true;
			} else {// if all the facts have been set with a value which
					// deviates from default, then the default answer can't be
					// applied
				getJText_log().append(
						currentQ.getId()
								+ " cannot be answered with default values.\n");
				return false;
			}
		} else
			return true;
	}

    public void actionPerformed(java.awt.event.ActionEvent e) {
		String command = e.getActionCommand();
		if (command.equals("Answer")) {// NOTE: users can only give valid
										// answers, otherwise the button
										// "Answer" is disabled
			for (String fID : buttonsList.keySet()) {
				// override the facts valuation for the question being answered
				// with the selected values
				if ((buttonsList.get(fID)).isSelected()) {
					currentS.vs.put(fID, TRUE);
					currentS.t.add(fID);
					bddc.setFact(fID, "1");
				} else {
					currentS.vs.put(fID, FALSE);
					currentS.f.add(fID);
					bddc.setFact(fID, "0");
				}
			}
		} else if (command.equals("Default Answer")) {
			for (String fID : buttonsList.keySet()) {
				// override the facts valuation for the question being answered
				// with their default values
				if (retrieveFact(fID).isDefault()) {
					currentS.vs.put(fID, TRUE);
					currentS.t.add(fID);
					bddc.setFact(fID, "1");
				} else {
					currentS.vs.put(fID, FALSE);
					currentS.f.add(fID);
					bddc.setFact(fID, "0");
				}
			}
		} else if (command.equals("Rollback")) {
			int pos, cState;
			String valueNEW;

			pos = states.get(states.size() - 1).qs.indexOf(selectedQ.getId());// get
																				// the
																				// position
																				// of
																				// the
																				// question
																				// to
																				// rollback
																				// in
																				// the
																				// last
																				// state
			for (int i = states.size() - 1; i > pos; i--) {
				states.remove(i);
				answeredQ.remove(i - 1);
			}
			cState = states.size() - 1;
			currentS = new State(states.get(cState));// the last state after
														// removing
			getJText_log().append(
					"Rolled back from " + selectedQ.getId()
							+ " onwards. Current state: s" + cState + ".qs: "
							+ currentS.qs.toString() + "\n");

			for (String fID : currentS.vs.keySet()) {// restores the facts
														// values in bddc
														// exatcly to the state
														// beinf restored
				valueNEW = currentS.vs.get(fID);
				if (valueNEW.equals("unset"))
					bddc.setFact(fID, "u" + fID);
				else if (valueNEW.equals("true"))
					bddc.setFact(fID, "1");
				else
					bddc.setFact(fID, "0");
			}

			cleanQInspector();
			if (getJDialog_FI().isVisible()) {
				cleanFInspector();
			}
			getExportMenuItem().setEnabled(false);// after a Rollback at least a
													// question changes its
													// status to unanswered, so
													// the configuration cannot
													// be exported as not
													// finished
			if (!continueC)
				checkMandatoryF();

			validQ.clear();
			updateValidQ();
		}
		if (command.equals("Answer") || command.equals("Default Answer")) {// common
																			// activities
			validQ.removeElement(selectedQ);// the question is no more valid

			currentS.qs.add(selectedQ.getId());// register the question just
												// answered
			getJText_log().append(
					"s" + states.size() + ".qs: " + currentS.qs.toString()
							+ "\n");// updates log (done before updating list
									// states, so as to get the correct state
									// number starting from 0=s_init)
			states.add(new State(currentS));// creates a new state with the info
											// of currentS and stores it in list
											// states
			answeredQ.addElement(selectedQ);// Now it is answered

			selectedQ = null;// just to clean memory a bit...
			updateValidQ();// calls this method to calculate the new valid
							// questions
			jButton_answerPerform.setEnabled(false);// disable the answer button
			jButton_answerDefault.setEnabled(false);// disable the default
													// answer button
			tempS.vs.clear();
			tempS.t.clear();
			tempS.f.clear();
			tempS.qs.clear();
			tempS = null;// frees the temporary state

			cleanQInspector();
			if (getJDialog_FI().isVisible()) {
				cleanFInspector();
			}
			if (validQ.size() != 0) {// doesn't make sense to check for
										// mandatory facts if all the questions
										// have been already answered
				if (!continueC)
					checkMandatoryF();
			} else {
				// getJDialog_AskToSave().setVisible(true);//prompt to export
				// the results
				cFlag = false;
				// getJText_log().append("Configuration process completed\n");
				exportConfiguration(true);// create temporary DCL file
				getExportMenuItem().setEnabled(true);
				getJDialog_AskToSave().setVisible(true);// prompt to export
														// result
			}
		}
	}

}
