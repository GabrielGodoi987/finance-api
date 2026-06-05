FROM node:24.0.0-slim

WORKDIR /home/node/app

RUN apt update && \
    apt install openssl procps -y && \
    npm install -g @nestjs/cli@11

COPY package*.json ./
RUN npm install

COPY prisma/ ./prisma/
RUN npx prisma generate

COPY . .

USER node

CMD [ "npm", "run", "start:dev" ]