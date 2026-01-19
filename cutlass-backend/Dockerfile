FROM node:alpine
LABEL authors="Olli-Pekka Wallin"

WORKDIR /usr/src/app

COPY . .
RUN yarn install --frozen-lockfile

EXPOSE 3010
CMD ["node", "index.js"]
