FROM node:current-alpine3.16

WORKDIR /home/app

COPY . .

RUN npm install -g typescript && \
    npm install && \
    tsc ./src/*.ts

ENV PORT=8080

EXPOSE 8080

CMD node src/main.js