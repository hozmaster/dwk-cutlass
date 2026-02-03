FROM postgres:18.1
LABEL authors="matsukan"

ENV POSTGRES_PASSWORD="nopassword"

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        gnupg

RUN mkdir -p /usr/src/app

COPY cutbackup.sh /bin/cutbackup.sh

