FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar app.jar
COPY bddc/ bddc
EXPOSE 5050
ENTRYPOINT ["java","-jar","/app.jar","--spring.config.location=classpath:/application-prod.properties"]