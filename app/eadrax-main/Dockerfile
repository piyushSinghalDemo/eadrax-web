FROM openjdk:8u151-jdk-alpine
VOLUME /tmp
ADD build/libs/eadrax-main-*.jar app.jar
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -jar -Dspring.profiles.active=$PROFILE -Djava.security.egd=file:/dev/./urandom /app.jar" ]
