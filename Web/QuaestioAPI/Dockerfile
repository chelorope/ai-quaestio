# Importing JDK and copying required files
FROM --platform=linux/amd64 openjdk:19-jdk AS build
WORKDIR /app
VOLUME /tmp
COPY pom.xml .
COPY src src

# Copy Maven wrapper
COPY mvnw .
COPY .mvn .mvn

# Set execution permission for the Maven wrapper
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the final Docker image
FROM --platform=linux/amd64 openjdk:19-jdk
VOLUME /tmp

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar
COPY bddc/ bddc
COPY entrypoint.sh .
ENTRYPOINT ["sh","entrypoint.sh"]
EXPOSE 5050