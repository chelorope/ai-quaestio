package com.quaestio.web;

import java.util.List;

import com.processconfiguration.qml.FactType;
import com.processconfiguration.qml.QuestionType;

public class Functions {
    

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
}
