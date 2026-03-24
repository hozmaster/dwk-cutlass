FROM node:alpine
LABEL authors="Olli-Pekka Wallin"

RUN apk update && \
    apk add --no-cache postgresql-client && \
    rm -rf /var/cache/apk/*

RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY . .
RUN yarn install --frozen-lockfile

EXPOSE 3010
CMD ["node", "index.js"]