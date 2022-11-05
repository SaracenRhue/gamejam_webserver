FROM node:current-alpine3.16

WORKDIR /home/app

RUN apk add git && \
    git clone https://github.com/SaracenRhue/gamejam_webserver.git . && \
    rm -fr .gitignore && \
    rm -fr .dockerignore && \
    rm -fr Dockerfile && \
    npm install -g typescript && \
    npm install && \
    tsc ./src/*.ts

ENV PORT=8080

EXPOSE 8080

CMD node src/main.js