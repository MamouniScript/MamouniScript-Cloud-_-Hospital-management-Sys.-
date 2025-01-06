FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=*.jar
COPY ./Rendez-vous-0.0.1-SNAPSHOT.jar rendez-vous_ms.jar
ENTRYPOINT ["java", "-jar","/rendez-vous_ms.jar"]