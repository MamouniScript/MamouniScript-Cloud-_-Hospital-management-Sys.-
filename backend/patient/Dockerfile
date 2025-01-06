FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=*.jar
COPY ./Patient-0.0.1-SNAPSHOT.jar patient_ms.jar
ENTRYPOINT ["java", "-jar","/patient_ms.jar"]