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
/**
 * Copyright  2006-2009, Marcello La Rosa (marcello.larosa@gmail.com)
 *   
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *  
 * Contributors:
 *      Marcello La Rosa - initial API and implementation
 */
package com.processconfiguration.utils;


import java.io.File;

import javax.swing.filechooser.FileFilter;



public class TXTFilter extends FileFilter {

	@Override
	public boolean accept(File f) {
		if (f.isDirectory()) {
			return true;//enable directories
		}

		String extension = Utils.getExtension(f);
		if (extension != null) {
			if (extension.equals(Utils.txt))
				return true;
			else {
				return false;
			}
		}

		return false;
	}


	@Override
	public String getDescription() {
		return "Text document (*.txt)";
	}

}
