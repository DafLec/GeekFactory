FROM node:8.11.1
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install && npm cache verify
