FROM busybox:1.36.1 AS h2-sourcer

# Get h2.jar that offers RunScript tool
# ARG H2_VERSION=1.4.200
ARG H2_VERSION=2.3.232
ENV DOWNLOAD=https://repo1.maven.org/maven2/com/h2database/h2/${H2_VERSION}/h2-${H2_VERSION}.jar
RUN wget -O h2.jar $DOWNLOAD


# FROM openjdk:14-alpine
FROM eclipse-temurin:21-jre-alpine
LABEL maintainer="dijure.com jonathan.johnson@dijure.com"

# Get artifact from above
COPY --from=h2-sourcer h2.jar h2.jar

# Add seeding script
COPY world.sql /tmp

# From seeding sql generate database file and place in mount path shared with H2 engine
CMD ["java", "-cp", "h2.jar", "org.h2.tools.RunScript", "-url", "jdbc:h2:/h2-data/world", "-script", "/tmp/world.sql"]

# Connect to H2 database with JDBC URL jdbc:h2:/h2-data/world, no user or password.
