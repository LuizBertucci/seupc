FROM node:current-slim

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8080

CMD npm run start