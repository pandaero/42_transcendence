FROM postgres:alpine3.18

ENV POSTGRES_PASSWORD docker
# ENV POSTGRES_DB trancendense_db

COPY config.sql /docker-entrypoint-initdb.d/
