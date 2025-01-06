FROM eclipse-temurin:17-jre-alpine

VOLUME /tmp

ARG JAR_FILE=*.jar

COPY ./api-gateway-0.0.1-SNAPSHOT.jar apiGateWay.jar

ENTRYPOINT ["java","-jar","/apiGateWay.jar"]