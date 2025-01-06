FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=*.jar
COPY ./Medecin-0.0.1-SNAPSHOT.jar medecin_ms.jar
ENTRYPOINT ["java", "-jar","/medecin_ms.jar"]