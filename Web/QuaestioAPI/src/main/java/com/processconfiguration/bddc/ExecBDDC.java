/*******************************************************************************
 * Copyright  2006-2011, www.processconfiguration.com
 *   
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *   
 * Contributors:
 *      Marcello La Rosa - initial API and implementation, subsequent revisions
 *      Florian Gottschalk - individualizer for YAWL
 *      Possakorn Pitayarojanakul - integration with Configurator and Individualizer
 ******************************************************************************/
package com.processconfiguration.bddc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.TreeMap;

public class ExecBDDC {
	private PrintWriter writer;
	private BufferedReader reader;
	private Process p;
	private String cos;// this is the command related to the constraints
	private String cos_v;// this is the command related to the constraints, to
							// which variable 'c' refers
	private boolean first;
	private TreeMap<String, Boolean> valuation;
	private static boolean ValuationSet;

	public void ListFiles(String pathStr) {
        Path path = Paths.get(pathStr);

		System.out.println("LISTING FILES IN " + pathStr);
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(path)) {
            for (Path file: stream) {
                System.out.println(file.getFileName());
            }
        } catch (IOException e) {
            System.err.println("Error reading directory: " + e.getMessage());
        }
    }

	public ExecBDDC(String constraints) {
		cos = constraints + ";";
		cos_v = "c := " + cos;
		ListFiles("./bddc/");
		try {
			String osName = System.getProperty("os.name");
			if (osName.startsWith("Windows"))
				osName = "./bddc/bddc.exe";
			else if (osName.startsWith("Linux"))
				osName = "./bddc/bddcL";
			else if (osName.startsWith("Solaris"))
				osName = "./bddc/bddcS";
			else if (osName.startsWith("Mac OS X"))
				osName = "./bddc/bddcL";
			else {
				System.err
						.println("Operating System not supported or os.name protected. Assume Windows architecture.");
				osName = "./bddc/bddc.exe";
			}
			ProcessBuilder processBuilder = new ProcessBuilder(osName);
			p = processBuilder.start();
			writer = new PrintWriter(p.getOutputStream());
			reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public ExecBDDC(TreeMap<String, Boolean> valuation) {
		ValuationSet = false;
		this.valuation = valuation;
		Runtime rt = Runtime.getRuntime();
		try {
			String osName = System.getProperty("os.name");
			if (osName.startsWith("Windows"))
				osName = "./bddc/bddc.exe";
			else if (osName.startsWith("Linux"))
				osName = "./bddc/bddcL";
			else if (osName.startsWith("Solaris"))
				osName = "./bddc/bddcS";
			else if (osName.startsWith("Mac OS X"))
				osName = "./bddc/bddcL";
			else {
				System.err
						.println("Operating System not supported or os.name protected. Assume Windows architecture.");
				osName = "./bddc/bddc.exe";
			}
			ProcessBuilder processBuilder = new ProcessBuilder(osName);
			p = processBuilder.start();
			writer = new PrintWriter(p.getOutputStream());
			reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public void init(String init) {// initialises a process by setting all the
									// facts (variables) to arguments
		setCommand(init);
		consumeOutput();
		first = true;// sets first to true, that means to load cos_v into memory
	}

	public void setCommand(String line) {// passes a command as input to the
											// process

		if (writer != null) {
			writer.print(line + "\n");// set the process input
			writer.flush();
		}
	}

	public void consumeOutput() {// simply consumes the process output. Useful
									// for initialization
		try {
			reader.read();
			while (reader.ready())
				// empties the buffer
				reader.readLine();

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public boolean isViolated(String cond) {
		String value;
		String condition;
		char[] data = new char[1];
		if (ValuationSet == false) {
			for (String fID : valuation.keySet()) {// first, it sets the
													// variables to the ones of
													// the configuration or
													// partial configuration to
													// be verified
				value = valuation.get(fID).toString();
				if (value.equals("true")) {
					setCommand(fID + " := 1;");
					consumeOutput();// consumes the output from the previous
									// command as it is not needed
				} else if (value.equals("false")) {
					setCommand(fID + " := 0;");
					consumeOutput();// consumes the output from the previous
									// command as it is not needed
				}
			}
			ValuationSet = true;
		}
		condition = cond + ";";// cos_v="c := "+condition;
		setCommand(condition);// second, it verifies if the constraints are
								// still met
		try {
			reader.read(data, 0, 1);// '0' if constraints are violated,
									// something else otherwise
			while (reader.ready())
				// empties the buffer
				reader.readLine();

		} catch (IOException e) {
			e.printStackTrace();
		}

		if (data[0] == '1')
			return true;
		else
			return false;
	}

	public boolean isViolated(TreeMap<String, String> valuation) {// true if
																	// given a
																	// configuration
																	// as input,
																	// the
																	// constraints
																	// are
																	// violated,
																	// false
																	// otherwise
		String value;
		char[] data = new char[1];

		for (String fID : valuation.keySet()) {// first, it sets the variables
												// to the ones of the
												// configuration or partial
												// configuration to be verified
			value = valuation.get(fID);
			if (value.equals("true")) {
				setCommand(fID + " := 1;");
				consumeOutput();// consumes the output from the previous command
								// as it is not needed
			} else if (value.equals("false")) {
				setCommand(fID + " := 0;");
				consumeOutput();// consumes the output from the previous command
								// as it is not needed
			}

		}
		setCommand(cos);// second, it verifies if the constraints are still met
		try {
			// the output from reading the file: 'reading "..."'
			reader.read(data, 0, 1);// '0' if constraints are violated,
									// something else otherwise
			while (reader.ready())
				// empties the buffer
				reader.readLine();

		} catch (IOException e) {
			e.printStackTrace();
		}
		for (String fID : valuation.keySet()) {// third, it resets the
												// configuration (all the facts
												// are UNSET). This is necessary
												// if later an XOR question is
												// checked with isXOR() method
			value = valuation.get(fID);
			if (value.equals("true") || value.equals("false")) {
				setFact(fID, "u" + fID.substring(1));
			}
		}

		if (data[0] == '0')
			return true;
		else
			return false;
	}

	public boolean isXOR(List<String> factsList) {// checks whether a set of
													// facts is in a partial XOR
													// relation (at most one
													// must be true)
		char[] data = new char[2];
		StringBuffer facts = new StringBuffer("");
		String factsL;
		if (first) {
			setCommand(cos_v);// executes the command to set variable 'c' equals
								// to the constraints
			consumeOutput();// consumes the output from the previous command as
							// it is not needed
			first = false;
		}
		for (String fID : factsList) {
			facts.append(fID + ",");
		}
		factsL = facts.toString().substring(0, facts.toString().length() - 1);// to
																				// cut
																				// the
																				// last
																				// comma
																				// ","
		setCommand("c => #(" + factsL + ");");// verifies if c implies the
												// partial XOR (command # of the
												// process: "at most one true")

		try {
			reader.read(data, 0, 2);// '1' if the facts are in partial XOR
			while (reader.ready())
				// empties the buffer (in case the output is not '0' or '1')
				reader.readLine();

		} catch (IOException e) {
			e.printStackTrace();
		}
		if (data[0] == '1' && (data[1] == '\n' || data[1] == '\r')) {
			return true;
		} else {
			return false;
		}
	}

	public void setFact(String fID, String value) {// once the fact's setting is
													// accepted, it has to be
													// set in the process//TODO:
													// do we need it?
		setCommand(fID + " := " + value + ";");
		consumeOutput();
	}

	public int isForceable(String fID) {// given a partial configuration, it
										// checks whether a set of facts is
										// forceable to TRUE or FALSE
		char[] data = new char[1];
		// if (!first){
		setCommand(cos_v);// executes the command to set variable 'c' equal to
							// the constraints
		consumeOutput();// consumes the output from the previous command as it
						// is not needed
		// first=false;
		// }
		try {
			// verifies if f is forceable to TRUE
			setCommand("c => " + fID + ";");
			reader.read(data, 0, 1);// '1' if the fact is forceable to TRUE
			while (reader.ready())
				// empties the buffer (in case the output is not '1')
				reader.readLine();
			if (data[0] == '1') {
				// DONE in Main.java
				return 1;// forceable to true
			}
			// verifies if f is forceable to FALSE
			setCommand("c => -" + fID + ";");
			reader.read(data, 0, 1);// '1' if the fact is forceable to FALSE
			while (reader.ready())
				// empties the buffer (in case the output is not '1')
				reader.readLine();
			if (data[0] == '1') {
				// DONE in Main.java
				return -1;// forceable to false
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		return 0;// not forceable
	}
}
