FROM node:22.11.0-slim

RUN apt update && apt install openssl procps -y
RUN npm i -g @nestjs/cli@10.0.0

WORKDIR /home/app

COPY . .


CMD [ "tail", "-f", "/dev/null" ]