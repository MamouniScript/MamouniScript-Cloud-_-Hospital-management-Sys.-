FROM eclipse-temurin:17-jre-alpine

VOLUME /tmp

ARG JAR_FILE=/*.jar

COPY ./eureka-server-0.0.1-SNAPSHOT.jar /eureka-server.jar

ENTRYPOINT ["java","-jar","/eureka-server.jar"]