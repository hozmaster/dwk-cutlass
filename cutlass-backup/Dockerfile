FROM postgres:18.1
LABEL authors="matsukan"

ENV POSTGRES_PASSWORD="nopassword"

RUN mkdir -p /usr/src/app

COPY cutbackup.sh /bin/cutbackup.sh
