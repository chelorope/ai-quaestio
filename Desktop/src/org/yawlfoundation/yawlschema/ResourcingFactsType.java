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

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlType;

/**
 * <p>
 * Java class for ResourcingFactsType complex type.
 * 
 * <p>
 * The following schema fragment specifies the expected content contained within
 * this class.
 * 
 * <pre>
 * &lt;complexType name="ResourcingFactsType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="offer" type="{http://www.yawlfoundation.org/yawlschema}ResourcingOfferFactsType"/>
 *         &lt;element name="allocate" type="{http://www.yawlfoundation.org/yawlschema}ResourcingAllocateFactsType"/>
 *         &lt;element name="start" type="{http://www.yawlfoundation.org/yawlschema}ResourcingInteractionInitiatorType"/>
 *         &lt;element name="privileges" type="{http://www.yawlfoundation.org/yawlschema}ResourcingPrivilegesFactsType" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ResourcingFactsType", propOrder = { "offer", "allocate",
		"start", "privileges" })
public class ResourcingFactsType {

	@XmlElement(required = true)
	protected ResourcingOfferFactsType offer;
	@XmlElement(required = true)
	protected ResourcingAllocateFactsType allocate;
	@XmlElement(required = true)
	protected ResourcingInteractionInitiatorType start;
	protected ResourcingPrivilegesFactsType privileges;

	/**
	 * Gets the value of the offer property.
	 * 
	 * @return possible object is {@link ResourcingOfferFactsType }
	 * 
	 */
	public ResourcingOfferFactsType getOffer() {
		return offer;
	}

	/**
	 * Sets the value of the offer property.
	 * 
	 * @param value
	 *            allowed object is {@link ResourcingOfferFactsType }
	 * 
	 */
	public void setOffer(ResourcingOfferFactsType value) {
		this.offer = value;
	}

	/**
	 * Gets the value of the allocate property.
	 * 
	 * @return possible object is {@link ResourcingAllocateFactsType }
	 * 
	 */
	public ResourcingAllocateFactsType getAllocate() {
		return allocate;
	}

	/**
	 * Sets the value of the allocate property.
	 * 
	 * @param value
	 *            allowed object is {@link ResourcingAllocateFactsType }
	 * 
	 */
	public void setAllocate(ResourcingAllocateFactsType value) {
		this.allocate = value;
	}

	/**
	 * Gets the value of the start property.
	 * 
	 * @return possible object is {@link ResourcingInteractionInitiatorType }
	 * 
	 */
	public ResourcingInteractionInitiatorType getStart() {
		return start;
	}

	/**
	 * Sets the value of the start property.
	 * 
	 * @param value
	 *            allowed object is {@link ResourcingInteractionInitiatorType }
	 * 
	 */
	public void setStart(ResourcingInteractionInitiatorType value) {
		this.start = value;
	}

	/**
	 * Gets the value of the privileges property.
	 * 
	 * @return possible object is {@link ResourcingPrivilegesFactsType }
	 * 
	 */
	public ResourcingPrivilegesFactsType getPrivileges() {
		return privileges;
	}

	/**
	 * Sets the value of the privileges property.
	 * 
	 * @param value
	 *            allowed object is {@link ResourcingPrivilegesFactsType }
	 * 
	 */
	public void setPrivileges(ResourcingPrivilegesFactsType value) {
		this.privileges = value;
	}

}