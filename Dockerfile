FROM node:14.15.1-alpine3.11

ENV HOME=/app
ENV HOST 0.0.0.0

WORKDIR $HOME

COPY package.json .

ARG NODE_ENV

RUN env

RUN npm install
RUN npm cache verify