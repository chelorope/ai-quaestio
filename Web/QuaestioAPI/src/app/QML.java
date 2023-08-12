package app;

import java.io.File;

import com.processconfiguration.qml.QMLType;

import jakarta.xml.bind.*;

public class QML {

	public static QMLType fromFile(File fIn) {
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
}