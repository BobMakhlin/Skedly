FROM eclipse-temurin:17-jre

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 5010

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=40.0", "-jar", "/app/app.jar"]