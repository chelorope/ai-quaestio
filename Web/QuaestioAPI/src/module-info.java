/**
 * 
 */
/**
 * @author marcelo
 *
 */
module QuaestioAPI {
	requires java.desktop;
	requires jakarta.xml.bind;
	requires spark.core;
	requires javax.servlet.api;
	requires java.logging;
	opens com.processconfiguration.qml to jakarta.xml.bind;
}