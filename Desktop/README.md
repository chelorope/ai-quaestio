# Quaestio Desktop Application

## Overview

Quaestio is a Java-based desktop application that appears to be focused on process configuration and management. The project is built using Maven and follows a standard Java project structure.

## Project Structure

```
Desktop/
├── src/                    # Source code directory
│   ├── com/               # Main application code
│   ├── org/               # Additional organization-specific code
│   ├── schema/            # XML schema definitions
│   ├── epml/              # EPML-related resources
│   └── icons/             # Application icons
├── test/                  # Test directory
├── target/                # Build output directory
└── pom.xml               # Maven project configuration
```

## Requirements

- Java 17 or higher
- Maven 3.x

## Dependencies

- Jakarta XML Bind API (4.0.0)
- JAXB Implementation (4.0.0)

## Building the Project

To build the project, run the following command in the project root directory:

```bash
mvn clean package
```

This will create an executable JAR file in the `target` directory.

## Running the Application

After building, you can run the application using:

```bash
java -jar target/Quaestio-0.0.1-SNAPSHOT.jar
```
