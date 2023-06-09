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

import java.math.BigInteger;

import jakarta.xml.bind.JAXBElement;
import jakarta.xml.bind.annotation.XmlElementDecl;
import jakarta.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

/**
 * This object contains factory methods for each Java content interface and Java
 * element interface generated in the org.yawlfoundation.yawlschema package.
 * <p>
 * An ObjectFactory allows you to programatically construct new instances of the
 * Java representation for XML content. The Java representation of XML content
 * can consist of schema derived interfaces and classes representing the binding
 * of schema type definitions, element declarations and model groups. Factory
 * methods for each of these are provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

	private final static QName _SpecificationSet_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "specificationSet");
	private final static QName _LayoutAttributesFactsTypeDisconnectable_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "disconnectable");
	private final static QName _LayoutAttributesFactsTypeBackgroundColor_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "backgroundColor");
	private final static QName _LayoutAttributesFactsTypeFont_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "font");
	private final static QName _LayoutAttributesFactsTypeEndFill_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "endFill");
	private final static QName _LayoutAttributesFactsTypeLineStyle_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "lineStyle");
	private final static QName _LayoutAttributesFactsTypeConnectable_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "connectable");
	private final static QName _LayoutAttributesFactsTypeLinecolor_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "linecolor");
	private final static QName _LayoutAttributesFactsTypeLineEnd_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "lineEnd");
	private final static QName _LayoutAttributesFactsTypeAutosize_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "autosize");
	private final static QName _LayoutAttributesFactsTypeResize_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "resize");
	private final static QName _LayoutAttributesFactsTypeEditable_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "editable");
	private final static QName _LayoutAttributesFactsTypeSize_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "size");
	private final static QName _LayoutAttributesFactsTypeOpaque_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "opaque");
	private final static QName _LayoutAttributesFactsTypeBendable_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "bendable");
	private final static QName _LayoutAttributesFactsTypeBounds_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "bounds");
	private final static QName _LayoutAttributesFactsTypeOffset_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "offset");
	private final static QName _LayoutAttributesFactsTypeForegroundColor_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "foregroundColor");
	private final static QName _LayoutAttributesFactsTypeLabelposition_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "labelposition");
	private final static QName _LayoutAttributesFactsTypeSizeable_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "sizeable");
	private final static QName _LayoutAttributesFactsTypePoints_QNAME = new QName(
			"http://www.yawlfoundation.org/yawlschema", "points");

	/**
	 * Create a new ObjectFactory that can be used to create new instances of
	 * schema derived classes for package: org.yawlfoundation.yawlschema
	 * 
	 */
	public ObjectFactory() {
	}

	/**
	 * Create an instance of {@link AddressType.NumAndStreet }
	 * 
	 */
	public AddressType.NumAndStreet createAddressTypeNumAndStreet() {
		return new AddressType.NumAndStreet();
	}

	/**
	 * Create an instance of {@link LayoutDecoratorFactsType }
	 * 
	 */
	public LayoutDecoratorFactsType createLayoutDecoratorFactsType() {
		return new LayoutDecoratorFactsType();
	}

	/**
	 * Create an instance of
	 * {@link ResourcingDistributionSetFactsType.InitialSet.Param }
	 * 
	 */
	public ResourcingDistributionSetFactsType.InitialSet.Param createResourcingDistributionSetFactsTypeInitialSetParam() {
		return new ResourcingDistributionSetFactsType.InitialSet.Param();
	}

	/**
	 * Create an instance of {@link NetFactsType }
	 * 
	 */
	public NetFactsType createNetFactsType() {
		return new NetFactsType();
	}

	/**
	 * Create an instance of {@link ResourcingPrivilegesFactsType.Privilege }
	 * 
	 */
	public ResourcingPrivilegesFactsType.Privilege createResourcingPrivilegesFactsTypePrivilege() {
		return new ResourcingPrivilegesFactsType.Privilege();
	}

	/**
	 * Create an instance of
	 * {@link ResourcingDistributionSetFactsType.Constraints }
	 * 
	 */
	public ResourcingDistributionSetFactsType.Constraints createResourcingDistributionSetFactsTypeConstraints() {
		return new ResourcingDistributionSetFactsType.Constraints();
	}

	/**
	 * Create an instance of {@link OutputPortConfigType }
	 * 
	 */
	public OutputPortConfigType createOutputPortConfigType() {
		return new OutputPortConfigType();
	}

	/**
	 * Create an instance of {@link LayoutVertexFactsType }
	 * 
	 */
	public LayoutVertexFactsType createLayoutVertexFactsType() {
		return new LayoutVertexFactsType();
	}

	/**
	 * Create an instance of {@link LayoutDimensionType }
	 * 
	 */
	public LayoutDimensionType createLayoutDimensionType() {
		return new LayoutDimensionType();
	}

	/**
	 * Create an instance of {@link RemovesTokensFromFlowType }
	 * 
	 */
	public RemovesTokensFromFlowType createRemovesTokensFromFlowType() {
		return new RemovesTokensFromFlowType();
	}

	/**
	 * Create an instance of {@link InputPortConfigType }
	 * 
	 */
	public InputPortConfigType createInputPortConfigType() {
		return new InputPortConfigType();
	}

	/**
	 * Create an instance of {@link LayoutRectangleType }
	 * 
	 */
	public LayoutRectangleType createLayoutRectangleType() {
		return new LayoutRectangleType();
	}

	/**
	 * Create an instance of {@link MultipleInstanceExternalTaskFactsType }
	 * 
	 */
	public MultipleInstanceExternalTaskFactsType createMultipleInstanceExternalTaskFactsType() {
		return new MultipleInstanceExternalTaskFactsType();
	}

	/**
	 * Create an instance of {@link VarMappingFactsType }
	 * 
	 */
	public VarMappingFactsType createVarMappingFactsType() {
		return new VarMappingFactsType();
	}

	/**
	 * Create an instance of
	 * {@link ResourcingOfferFactsType.FamiliarParticipant }
	 * 
	 */
	public ResourcingOfferFactsType.FamiliarParticipant createResourcingOfferFactsTypeFamiliarParticipant() {
		return new ResourcingOfferFactsType.FamiliarParticipant();
	}

	/**
	 * Create an instance of {@link CreationModeType }
	 * 
	 */
	public CreationModeType createCreationModeType() {
		return new CreationModeType();
	}

	/**
	 * Create an instance of {@link DecompositionType }
	 * 
	 */
	public DecompositionType createDecompositionType() {
		return new DecompositionType();
	}

	/**
	 * Create an instance of {@link LayoutLocaleType }
	 * 
	 */
	public LayoutLocaleType createLayoutLocaleType() {
		return new LayoutLocaleType();
	}

	/**
	 * Create an instance of {@link ConfigurationType }
	 * 
	 */
	public ConfigurationType createConfigurationType() {
		return new ConfigurationType();
	}

	/**
	 * Create an instance of {@link JoinConfigType }
	 * 
	 */
	public JoinConfigType createJoinConfigType() {
		return new JoinConfigType();
	}

	/**
	 * Create an instance of {@link CustomSchemaNamespaceMappingFactsType }
	 * 
	 */
	public CustomSchemaNamespaceMappingFactsType createCustomSchemaNamespaceMappingFactsType() {
		return new CustomSchemaNamespaceMappingFactsType();
	}

	/**
	 * Create an instance of {@link SpecificationSetType }
	 * 
	 */
	public SpecificationSetType createSpecificationSetType() {
		return new SpecificationSetType();
	}

	/**
	 * Create an instance of {@link ResourcingOfferFactsType }
	 * 
	 */
	public ResourcingOfferFactsType createResourcingOfferFactsType() {
		return new ResourcingOfferFactsType();
	}

	/**
	 * Create an instance of {@link ExpressionType }
	 * 
	 */
	public ExpressionType createExpressionType() {
		return new ExpressionType();
	}

	/**
	 * Create an instance of {@link AddressType }
	 * 
	 */
	public AddressType createAddressType() {
		return new AddressType();
	}

	/**
	 * Create an instance of {@link ExternalNetElementType }
	 * 
	 */
	public ExternalNetElementType createExternalNetElementType() {
		return new ExternalNetElementType();
	}

	/**
	 * Create an instance of {@link NofiConfigType }
	 * 
	 */
	public NofiConfigType createNofiConfigType() {
		return new NofiConfigType();
	}

	/**
	 * Create an instance of {@link ResourcingFactsType }
	 * 
	 */
	public ResourcingFactsType createResourcingFactsType() {
		return new ResourcingFactsType();
	}

	/**
	 * Create an instance of
	 * {@link MultipleInstanceExternalTaskFactsType.MiDataOutput }
	 * 
	 */
	public MultipleInstanceExternalTaskFactsType.MiDataOutput createMultipleInstanceExternalTaskFactsTypeMiDataOutput() {
		return new MultipleInstanceExternalTaskFactsType.MiDataOutput();
	}

	/**
	 * Create an instance of {@link LayoutFactsType }
	 * 
	 */
	public LayoutFactsType createLayoutFactsType() {
		return new LayoutFactsType();
	}

	/**
	 * Create an instance of {@link LayoutFrameType }
	 * 
	 */
	public LayoutFrameType createLayoutFrameType() {
		return new LayoutFrameType();
	}

	/**
	 * Create an instance of {@link WebServiceGatewayFactsType.YawlService }
	 * 
	 */
	public WebServiceGatewayFactsType.YawlService createWebServiceGatewayFactsTypeYawlService() {
		return new WebServiceGatewayFactsType.YawlService();
	}

	/**
	 * Create an instance of {@link LayoutNetFactsType }
	 * 
	 */
	public LayoutNetFactsType createLayoutNetFactsType() {
		return new LayoutNetFactsType();
	}

	/**
	 * Create an instance of {@link IndividualOrOrganisationType }
	 * 
	 */
	public IndividualOrOrganisationType createIndividualOrOrganisationType() {
		return new IndividualOrOrganisationType();
	}

	/**
	 * Create an instance of {@link ResourcingStartFactsType }
	 * 
	 */
	public ResourcingStartFactsType createResourcingStartFactsType() {
		return new ResourcingStartFactsType();
	}

	/**
	 * Create an instance of {@link ImportType }
	 * 
	 */
	public ImportType createImportType() {
		return new ImportType();
	}

	/**
	 * Create an instance of {@link VariableBaseType }
	 * 
	 */
	public VariableBaseType createVariableBaseType() {
		return new VariableBaseType();
	}

	/**
	 * Create an instance of {@link NamespaceURI }
	 * 
	 */
	public NamespaceURI createNamespaceURI() {
		return new NamespaceURI();
	}

	/**
	 * Create an instance of {@link RemConfigType }
	 * 
	 */
	public RemConfigType createRemConfigType() {
		return new RemConfigType();
	}

	/**
	 * Create an instance of {@link LocationType }
	 * 
	 */
	public LocationType createLocationType() {
		return new LocationType();
	}

	/**
	 * Create an instance of {@link WebServiceGatewayFactsType }
	 * 
	 */
	public WebServiceGatewayFactsType createWebServiceGatewayFactsType() {
		return new WebServiceGatewayFactsType();
	}

	/**
	 * Create an instance of {@link OutputConditionFactsType }
	 * 
	 */
	public OutputConditionFactsType createOutputConditionFactsType() {
		return new OutputConditionFactsType();
	}

	/**
	 * Create an instance of {@link ExternalConditionFactsType }
	 * 
	 */
	public ExternalConditionFactsType createExternalConditionFactsType() {
		return new ExternalConditionFactsType();
	}

	/**
	 * Create an instance of {@link ResourcingDistributionSetFactsType }
	 * 
	 */
	public ResourcingDistributionSetFactsType createResourcingDistributionSetFactsType() {
		return new ResourcingDistributionSetFactsType();
	}

	/**
	 * Create an instance of {@link LayoutFlowFactsType }
	 * 
	 */
	public LayoutFlowFactsType createLayoutFlowFactsType() {
		return new LayoutFlowFactsType();
	}

	/**
	 * Create an instance of {@link ResourcingAllocateFactsType }
	 * 
	 */
	public ResourcingAllocateFactsType createResourcingAllocateFactsType() {
		return new ResourcingAllocateFactsType();
	}

	/**
	 * Create an instance of {@link YAWLSpecificationFactsType }
	 * 
	 */
	public YAWLSpecificationFactsType createYAWLSpecificationFactsType() {
		return new YAWLSpecificationFactsType();
	}

	/**
	 * Create an instance of {@link NetFactsType.ProcessControlElements }
	 * 
	 */
	public NetFactsType.ProcessControlElements createNetFactsTypeProcessControlElements() {
		return new NetFactsType.ProcessControlElements();
	}

	/**
	 * Create an instance of {@link TimerDurationFactsType }
	 * 
	 */
	public TimerDurationFactsType createTimerDurationFactsType() {
		return new TimerDurationFactsType();
	}

	/**
	 * Create an instance of {@link LayoutFontType }
	 * 
	 */
	public LayoutFontType createLayoutFontType() {
		return new LayoutFontType();
	}

	/**
	 * Create an instance of {@link LayoutUserObjectHTMLType.Html.Body }
	 * 
	 */
	public LayoutUserObjectHTMLType.Html.Body createLayoutUserObjectHTMLTypeHtmlBody() {
		return new LayoutUserObjectHTMLType.Html.Body();
	}

	/**
	 * Create an instance of {@link PredicateType }
	 * 
	 */
	public PredicateType createPredicateType() {
		return new PredicateType();
	}

	/**
	 * Create an instance of {@link LayoutPortsType }
	 * 
	 */
	public LayoutPortsType createLayoutPortsType() {
		return new LayoutPortsType();
	}

	/**
	 * Create an instance of {@link SpecificationSetFactsType }
	 * 
	 */
	public SpecificationSetFactsType createSpecificationSetFactsType() {
		return new SpecificationSetFactsType();
	}

	/**
	 * Create an instance of {@link MetaDataType }
	 * 
	 */
	public MetaDataType createMetaDataType() {
		return new MetaDataType();
	}

	/**
	 * Create an instance of {@link SpecificationType }
	 * 
	 */
	public SpecificationType createSpecificationType() {
		return new SpecificationType();
	}

	/**
	 * Create an instance of {@link ControlTypeType }
	 * 
	 */
	public ControlTypeType createControlTypeType() {
		return new ControlTypeType();
	}

	/**
	 * Create an instance of {@link SplitConfigType }
	 * 
	 */
	public SplitConfigType createSplitConfigType() {
		return new SplitConfigType();
	}

	/**
	 * Create an instance of {@link ResourcingPrivilegesFactsType }
	 * 
	 */
	public ResourcingPrivilegesFactsType createResourcingPrivilegesFactsType() {
		return new ResourcingPrivilegesFactsType();
	}

	/**
	 * Create an instance of {@link FlowsIntoType }
	 * 
	 */
	public FlowsIntoType createFlowsIntoType() {
		return new FlowsIntoType();
	}

	/**
	 * Create an instance of {@link LayoutFactsType.Specification }
	 * 
	 */
	public LayoutFactsType.Specification createLayoutFactsTypeSpecification() {
		return new LayoutFactsType.Specification();
	}

	/**
	 * Create an instance of {@link ResourcingSetFactsType }
	 * 
	 */
	public ResourcingSetFactsType createResourcingSetFactsType() {
		return new ResourcingSetFactsType();
	}

	/**
	 * Create an instance of {@link ResourcingParamFactsType.Param }
	 * 
	 */
	public ResourcingParamFactsType.Param createResourcingParamFactsTypeParam() {
		return new ResourcingParamFactsType.Param();
	}

	/**
	 * Create an instance of {@link ResourcingSelectorFactsType }
	 * 
	 */
	public ResourcingSelectorFactsType createResourcingSelectorFactsType() {
		return new ResourcingSelectorFactsType();
	}

	/**
	 * Create an instance of {@link LayoutUserObjectHTMLType.Html }
	 * 
	 */
	public LayoutUserObjectHTMLType.Html createLayoutUserObjectHTMLTypeHtml() {
		return new LayoutUserObjectHTMLType.Html();
	}

	/**
	 * Create an instance of {@link InputParameterFactsType }
	 * 
	 */
	public InputParameterFactsType createInputParameterFactsType() {
		return new InputParameterFactsType();
	}

	/**
	 * Create an instance of {@link ResourcingInteractionInitiatorType }
	 * 
	 */
	public ResourcingInteractionInitiatorType createResourcingInteractionInitiatorType() {
		return new ResourcingInteractionInitiatorType();
	}

	/**
	 * Create an instance of {@link DirectionType }
	 * 
	 */
	public DirectionType createDirectionType() {
		return new DirectionType();
	}

	/**
	 * Create an instance of {@link LayoutUserObjectHTMLType }
	 * 
	 */
	public LayoutUserObjectHTMLType createLayoutUserObjectHTMLType() {
		return new LayoutUserObjectHTMLType();
	}

	/**
	 * Create an instance of {@link TimerType }
	 * 
	 */
	public TimerType createTimerType() {
		return new TimerType();
	}

	/**
	 * Create an instance of {@link NamespacePrefixType }
	 * 
	 */
	public NamespacePrefixType createNamespacePrefixType() {
		return new NamespacePrefixType();
	}

	/**
	 * Create an instance of {@link LayoutLabelFactsType }
	 * 
	 */
	public LayoutLabelFactsType createLayoutLabelFactsType() {
		return new LayoutLabelFactsType();
	}

	/**
	 * Create an instance of {@link TypeType }
	 * 
	 */
	public TypeType createTypeType() {
		return new TypeType();
	}

	/**
	 * Create an instance of {@link LayoutPointsType }
	 * 
	 */
	public LayoutPointsType createLayoutPointsType() {
		return new LayoutPointsType();
	}

	/**
	 * Create an instance of {@link ExternalNetElementFactsType }
	 * 
	 */
	public ExternalNetElementFactsType createExternalNetElementFactsType() {
		return new ExternalNetElementFactsType();
	}

	/**
	 * Create an instance of {@link CustomSchemaNamespaceMappingType }
	 * 
	 */
	public CustomSchemaNamespaceMappingType createCustomSchemaNamespaceMappingType() {
		return new CustomSchemaNamespaceMappingType();
	}

	/**
	 * Create an instance of {@link ResourcingDistributionSetFactsType.Filters }
	 * 
	 */
	public ResourcingDistributionSetFactsType.Filters createResourcingDistributionSetFactsTypeFilters() {
		return new ResourcingDistributionSetFactsType.Filters();
	}

	/**
	 * Create an instance of {@link SchemaType.Type }
	 * 
	 */
	public SchemaType.Type createSchemaTypeType() {
		return new SchemaType.Type();
	}

	/**
	 * Create an instance of {@link TypeNameType }
	 * 
	 */
	public TypeNameType createTypeNameType() {
		return new TypeNameType();
	}

	/**
	 * Create an instance of {@link VarMappingSetType }
	 * 
	 */
	public VarMappingSetType createVarMappingSetType() {
		return new VarMappingSetType();
	}

	/**
	 * Create an instance of {@link VariableFactsType }
	 * 
	 */
	public VariableFactsType createVariableFactsType() {
		return new VariableFactsType();
	}

	/**
	 * Create an instance of {@link ResourcingParamFactsType }
	 * 
	 */
	public ResourcingParamFactsType createResourcingParamFactsType() {
		return new ResourcingParamFactsType();
	}

	/**
	 * Create an instance of {@link OutputParameterFactsType }
	 * 
	 */
	public OutputParameterFactsType createOutputParameterFactsType() {
		return new OutputParameterFactsType();
	}

	/**
	 * Create an instance of
	 * {@link MultipleInstanceExternalTaskFactsType.MiDataInput }
	 * 
	 */
	public MultipleInstanceExternalTaskFactsType.MiDataInput createMultipleInstanceExternalTaskFactsTypeMiDataInput() {
		return new MultipleInstanceExternalTaskFactsType.MiDataInput();
	}

	/**
	 * Create an instance of {@link SchemaType }
	 * 
	 */
	public SchemaType createSchemaType() {
		return new SchemaType();
	}

	/**
	 * Create an instance of {@link ExternalTaskFactsType }
	 * 
	 */
	public ExternalTaskFactsType createExternalTaskFactsType() {
		return new ExternalTaskFactsType();
	}

	/**
	 * Create an instance of {@link LayoutContainerFactsType }
	 * 
	 */
	public LayoutContainerFactsType createLayoutContainerFactsType() {
		return new LayoutContainerFactsType();
	}

	/**
	 * Create an instance of {@link LayoutAttributesFactsType }
	 * 
	 */
	public LayoutAttributesFactsType createLayoutAttributesFactsType() {
		return new LayoutAttributesFactsType();
	}

	/**
	 * Create an instance of {@link LayoutPointType }
	 * 
	 */
	public LayoutPointType createLayoutPointType() {
		return new LayoutPointType();
	}

	/**
	 * Create an instance of
	 * {@link ResourcingDistributionSetFactsType.InitialSet }
	 * 
	 */
	public ResourcingDistributionSetFactsType.InitialSet createResourcingDistributionSetFactsTypeInitialSet() {
		return new ResourcingDistributionSetFactsType.InitialSet();
	}

	/**
	 * Create an instance of {@link LayoutColorType }
	 * 
	 */
	public LayoutColorType createLayoutColorType() {
		return new LayoutColorType();
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}
	 * {@link SpecificationSetFactsType }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "specificationSet")
	public JAXBElement<SpecificationSetFactsType> createSpecificationSet(
			SpecificationSetFactsType value) {
		return new JAXBElement<SpecificationSetFactsType>(
				_SpecificationSet_QNAME, SpecificationSetFactsType.class, null,
				value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "disconnectable", scope = LayoutAttributesFactsType.class)
	public JAXBElement<Boolean> createLayoutAttributesFactsTypeDisconnectable(
			Boolean value) {
		return new JAXBElement<Boolean>(
				_LayoutAttributesFactsTypeDisconnectable_QNAME, Boolean.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link BigInteger }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "backgroundColor", scope = LayoutAttributesFactsType.class)
	public JAXBElement<BigInteger> createLayoutAttributesFactsTypeBackgroundColor(
			BigInteger value) {
		return new JAXBElement<BigInteger>(
				_LayoutAttributesFactsTypeBackgroundColor_QNAME,
				BigInteger.class, LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link LayoutFontType }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "font", scope = LayoutAttributesFactsType.class)
	public JAXBElement<LayoutFontType> createLayoutAttributesFactsTypeFont(
			LayoutFontType value) {
		return new JAXBElement<LayoutFontType>(
				_LayoutAttributesFactsTypeFont_QNAME, LayoutFontType.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "endFill", scope = LayoutAttributesFactsType.class)
	public JAXBElement<Boolean> createLayoutAttributesFactsTypeEndFill(
			Boolean value) {
		return new JAXBElement<Boolean>(
				_LayoutAttributesFactsTypeEndFill_QNAME, Boolean.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link BigInteger }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "lineStyle", scope = LayoutAttributesFactsType.class)
	public JAXBElement<BigInteger> createLayoutAttributesFactsTypeLineStyle(
			BigInteger value) {
		return new JAXBElement<BigInteger>(
				_LayoutAttributesFactsTypeLineStyle_QNAME, BigInteger.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "connectable", scope = LayoutAttributesFactsType.class)
	public JAXBElement<Boolean> createLayoutAttributesFactsTypeConnectable(
			Boolean value) {
		return new JAXBElement<Boolean>(
				_LayoutAttributesFactsTypeConnectable_QNAME, Boolean.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link BigInteger }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "linecolor", scope = LayoutAttributesFactsType.class)
	public JAXBElement<BigInteger> createLayoutAttributesFactsTypeLinecolor(
			BigInteger value) {
		return new JAXBElement<BigInteger>(
				_LayoutAttributesFactsTypeLinecolor_QNAME, BigInteger.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link BigInteger }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "lineEnd", scope = LayoutAttributesFactsType.class)
	public JAXBElement<BigInteger> createLayoutAttributesFactsTypeLineEnd(
			BigInteger value) {
		return new JAXBElement<BigInteger>(
				_LayoutAttributesFactsTypeLineEnd_QNAME, BigInteger.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "autosize", scope = LayoutAttributesFactsType.class)
	public JAXBElement<Boolean> createLayoutAttributesFactsTypeAutosize(
			Boolean value) {
		return new JAXBElement<Boolean>(
				_LayoutAttributesFactsTypeAutosize_QNAME, Boolean.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "resize", scope = LayoutAttributesFactsType.class)
	public JAXBElement<Boolean> createLayoutAttributesFactsTypeResize(
			Boolean value) {
		return new JAXBElement<Boolean>(_LayoutAttributesFactsTypeResize_QNAME,
				Boolean.class, LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "editable", scope = LayoutAttributesFactsType.class)
	public JAXBElement<Boolean> createLayoutAttributesFactsTypeEditable(
			Boolean value) {
		return new JAXBElement<Boolean>(
				_LayoutAttributesFactsTypeEditable_QNAME, Boolean.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}
	 * {@link LayoutDimensionType }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "size", scope = LayoutAttributesFactsType.class)
	public JAXBElement<LayoutDimensionType> createLayoutAttributesFactsTypeSize(
			LayoutDimensionType value) {
		return new JAXBElement<LayoutDimensionType>(
				_LayoutAttributesFactsTypeSize_QNAME,
				LayoutDimensionType.class, LayoutAttributesFactsType.class,
				value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "opaque", scope = LayoutAttributesFactsType.class)
	public JAXBElement<Boolean> createLayoutAttributesFactsTypeOpaque(
			Boolean value) {
		return new JAXBElement<Boolean>(_LayoutAttributesFactsTypeOpaque_QNAME,
				Boolean.class, LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "bendable", scope = LayoutAttributesFactsType.class)
	public JAXBElement<Boolean> createLayoutAttributesFactsTypeBendable(
			Boolean value) {
		return new JAXBElement<Boolean>(
				_LayoutAttributesFactsTypeBendable_QNAME, Boolean.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}
	 * {@link LayoutRectangleType }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "bounds", scope = LayoutAttributesFactsType.class)
	public JAXBElement<LayoutRectangleType> createLayoutAttributesFactsTypeBounds(
			LayoutRectangleType value) {
		return new JAXBElement<LayoutRectangleType>(
				_LayoutAttributesFactsTypeBounds_QNAME,
				LayoutRectangleType.class, LayoutAttributesFactsType.class,
				value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link LayoutPointType }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "offset", scope = LayoutAttributesFactsType.class)
	public JAXBElement<LayoutPointType> createLayoutAttributesFactsTypeOffset(
			LayoutPointType value) {
		return new JAXBElement<LayoutPointType>(
				_LayoutAttributesFactsTypeOffset_QNAME, LayoutPointType.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link BigInteger }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "foregroundColor", scope = LayoutAttributesFactsType.class)
	public JAXBElement<BigInteger> createLayoutAttributesFactsTypeForegroundColor(
			BigInteger value) {
		return new JAXBElement<BigInteger>(
				_LayoutAttributesFactsTypeForegroundColor_QNAME,
				BigInteger.class, LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link LayoutPointType }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "labelposition", scope = LayoutAttributesFactsType.class)
	public JAXBElement<LayoutPointType> createLayoutAttributesFactsTypeLabelposition(
			LayoutPointType value) {
		return new JAXBElement<LayoutPointType>(
				_LayoutAttributesFactsTypeLabelposition_QNAME,
				LayoutPointType.class, LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "sizeable", scope = LayoutAttributesFactsType.class)
	public JAXBElement<Boolean> createLayoutAttributesFactsTypeSizeable(
			Boolean value) {
		return new JAXBElement<Boolean>(
				_LayoutAttributesFactsTypeSizeable_QNAME, Boolean.class,
				LayoutAttributesFactsType.class, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}
	 * {@link LayoutPointsType }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://www.yawlfoundation.org/yawlschema", name = "points", scope = LayoutAttributesFactsType.class)
	public JAXBElement<LayoutPointsType> createLayoutAttributesFactsTypePoints(
			LayoutPointsType value) {
		return new JAXBElement<LayoutPointsType>(
				_LayoutAttributesFactsTypePoints_QNAME, LayoutPointsType.class,
				LayoutAttributesFactsType.class, value);
	}

}
