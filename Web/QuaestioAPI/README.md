# Quaestio Web API

The QuaestioAPI project is a web application that serves as the backend for the Quaestio platform. It provides a RESTful API for managing and retrieving data related to questions and answers.

## Technology Stack

- Java 17
- Spring Boot 3.1.2
- Maven
- Docker
- Spring Session with JDBC
- JAXB for XML processing
- JSON processing with org.json

## Prerequisites

- [Java 17](https://www.java.com/en/download/help/download_options.html)
- [Apache Maven](https://maven.apache.org/install.html)
- [Docker](https://docs.docker.com/engine/install/)

## Project Structure

```
QuaestioAPI/
├── src/                    # Source code
├── bddc/                   # Database configuration
├── upload/                 # File upload directory
├── target/                 # Build output
├── .mvn/                   # Maven wrapper configuration
├── pom.xml                 # Maven project configuration
├── Dockerfile             # Docker configuration
├── entrypoint.sh          # Docker entrypoint script
├── local-build.sh         # Local build script
└── push-image.sh          # Docker image push script
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
mvn clean install
```

## Development

To run the application locally:

```bash
mvn spring-boot:run
```

## Building

To build the application:

```bash
mvn clean package
```

## Docker Deployment

### Local Build and Run

```bash
sh local-build.sh
```

### Push to Registry

```bash
sh push-image.sh
```

The application runs on port `5050` by default.
