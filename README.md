# QuaestioMDE

<!-- [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) -->

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green.svg)](https://spring.io/projects/spring-boot)

## Table of Contents

- [Description](#description)
- [Main Capabilities](#main-capabilities)
- [Project Structure](#project-structure)
- [References](#references)
- [Funding](#funding)
- [Acknowledgments](#acknowledgments)
- [Contributors](#contributors)

## Description

QuaestioMDE is an API-based web application for process model configuration. It results from reengineering the Synergia [1] toolset and is compatible with a Model-Driven Engineering approach for managing business process families [2].

## Main Capabilities

QuaestioMDE provides two main capabilities described in [3]:

1. **Questionnaire Designer**: Provides a visual editor that enables modelers to create questionnaires for process model configuration.
2. **Quaestio**: Generates interactive questionnaires from questionnaire models and then guides users through answering them to configure processes.

## Project Structure

### Desktop Application [↗](/Desktop)

The `Desktop` folder contains the original desktop application of Quaestio [3], which was developed using Java+Swing. This version was updated to work with a newer Java version and is currently executable.

### Web Application [↗](/Web)

The `Web` folder contains QuaestioMDE's new API-based web application, which has been divided into two parts:

#### QuaestioAPI [↗](/Web/QuaestioAPI)

`QuaestioAPI` is Quaestio's reengineered engine, which was exposed as an API using Spring Boot. It provides the backend functionality for the new QuaestioMDE.

#### QuaestioFront [↗](/Web/QuaestioFront)

`QuaestioFront` contains the new QuaestioMDE responsive UI. It provides an intuitive and user-friendly interface for interacting with the QuaestioAPI.

## References

[1]: Rosa, M.L., Gottschalk, F.: Synergia - comprehensive tool support for configurable process models. In: Proc. of the Business Process Management Demonstration Track (BPMDemos 2009). CEUR Workshop Proceedings, vol. 489. CEUR-WS.org (2009)

[2]: Delgado, A., Calegari, D., García, F., Weber, B.: Model-driven management of BPMN-based business process families. Softw. Syst. Model. 21(6), 2517–2553 (2022)

[3]: Rosa, M.L., van der Aalst, W.M.P., Dumas, M., ter Hofstede, A.H.M.: Questionnaire-based variability modeling for system configuration. Softw. Syst. Model. 8(2), 251–274 (2009)

## Funding

Partially supported by project "Ingeniería dirigida por modelos para la especificación y configuración de familias de procesos" funded by Comisión Sectorial de Investigación Científica (CSIC), Proyecto I+D 2022 "22520220100018UD", Uruguay.

## Acknowledgments

We thank [Marcello La Rosa](https://www.marcellolarosa.com/) for providing us with the former Quaestio source code.

## Contributors

- Marcelo Rodríguez
- Daniel Calegari
- Andrea Delgado
