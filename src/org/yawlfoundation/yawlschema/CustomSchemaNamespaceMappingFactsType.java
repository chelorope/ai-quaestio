/*******************************************************************************
 * Copyright � 2006-2011, www.processconfiguration.com
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
//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-558 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2008.11.03 at 05:04:23 PM CET 
//

package org.yawlfoundation.yawlschema;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * <p>
 * Java class for CustomSchemaNamespaceMappingFactsType complex type.
 * 
 * <p>
 * The following schema fragment specifies the expected content contained within
 * this class.
 * 
 * <pre>
 * &lt;complexType name="CustomSchemaNamespaceMappingFactsType">
 *   &lt;complexContent>
 *     &lt;extension base="{http://www.yawlfoundation.org/yawlschema}CustomSchemaNamespaceMappingType">
 *       &lt;sequence>
 *         &lt;element name="expandsTo" type="{http://www.yawlfoundation.org/yawlschema}URIType"/>
 *         &lt;element name="definedAt" type="{http://www.yawlfoundation.org/yawlschema}URIType"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "CustomSchemaNamespaceMappingFactsType", propOrder = {
		"expandsTo", "definedAt" })
public class CustomSchemaNamespaceMappingFactsType extends
		CustomSchemaNamespaceMappingType {

	@XmlElement(required = true)
	protected String expandsTo;
	@XmlElement(required = true)
	protected String definedAt;

	/**
	 * Gets the value of the expandsTo property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getExpandsTo() {
		return expandsTo;
	}

	/**
	 * Sets the value of the expandsTo property.
	 * 
	 * @param value
	 *            allowed object is {@link String }
	 * 
	 */
	public void setExpandsTo(String value) {
		this.expandsTo = value;
	}

	/**
	 * Gets the value of the definedAt property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getDefinedAt() {
		return definedAt;
	}

	/**
	 * Sets the value of the definedAt property.
	 * 
	 * @param value
	 *            allowed object is {@link String }
	 * 
	 */
	public void setDefinedAt(String value) {
		this.definedAt = value;
	}

}