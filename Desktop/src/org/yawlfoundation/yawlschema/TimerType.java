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
import jakarta.xml.bind.annotation.XmlType;
import javax.xml.datatype.Duration;

/**
 * <p>
 * Java class for TimerType complex type.
 * 
 * <p>
 * The following schema fragment specifies the expected content contained within
 * this class.
 * 
 * <pre>
 * &lt;complexType name="TimerType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;choice>
 *           &lt;element name="netparam" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *           &lt;sequence>
 *             &lt;element name="trigger" type="{http://www.yawlfoundation.org/yawlschema}TimerTriggerType"/>
 *             &lt;choice>
 *               &lt;element name="expiry" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *               &lt;choice>
 *                 &lt;element name="duration" type="{http://www.w3.org/2001/XMLSchema}duration"/>
 *                 &lt;element name="durationparams" type="{http://www.yawlfoundation.org/yawlschema}TimerDurationFactsType"/>
 *               &lt;/choice>
 *             &lt;/choice>
 *           &lt;/sequence>
 *         &lt;/choice>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TimerType", propOrder = { "netparam", "trigger", "expiry",
		"duration", "durationparams" })
public class TimerType {

	protected String netparam;
	protected TimerTriggerType trigger;
	protected Long expiry;
	protected Duration duration;
	protected TimerDurationFactsType durationparams;

	/**
	 * Gets the value of the netparam property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getNetparam() {
		return netparam;
	}

	/**
	 * Sets the value of the netparam property.
	 * 
	 * @param value
	 *            allowed object is {@link String }
	 * 
	 */
	public void setNetparam(String value) {
		this.netparam = value;
	}

	/**
	 * Gets the value of the trigger property.
	 * 
	 * @return possible object is {@link TimerTriggerType }
	 * 
	 */
	public TimerTriggerType getTrigger() {
		return trigger;
	}

	/**
	 * Sets the value of the trigger property.
	 * 
	 * @param value
	 *            allowed object is {@link TimerTriggerType }
	 * 
	 */
	public void setTrigger(TimerTriggerType value) {
		this.trigger = value;
	}

	/**
	 * Gets the value of the expiry property.
	 * 
	 * @return possible object is {@link Long }
	 * 
	 */
	public Long getExpiry() {
		return expiry;
	}

	/**
	 * Sets the value of the expiry property.
	 * 
	 * @param value
	 *            allowed object is {@link Long }
	 * 
	 */
	public void setExpiry(Long value) {
		this.expiry = value;
	}

	/**
	 * Gets the value of the duration property.
	 * 
	 * @return possible object is {@link Duration }
	 * 
	 */
	public Duration getDuration() {
		return duration;
	}

	/**
	 * Sets the value of the duration property.
	 * 
	 * @param value
	 *            allowed object is {@link Duration }
	 * 
	 */
	public void setDuration(Duration value) {
		this.duration = value;
	}

	/**
	 * Gets the value of the durationparams property.
	 * 
	 * @return possible object is {@link TimerDurationFactsType }
	 * 
	 */
	public TimerDurationFactsType getDurationparams() {
		return durationparams;
	}

	/**
	 * Sets the value of the durationparams property.
	 * 
	 * @param value
	 *            allowed object is {@link TimerDurationFactsType }
	 * 
	 */
	public void setDurationparams(TimerDurationFactsType value) {
		this.durationparams = value;
	}

}