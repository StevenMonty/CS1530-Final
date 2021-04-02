FROM node:latest

COPY frontend/package.json /package.json

WORKDIR /
RUN npm i

COPY deploy/Node/entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]