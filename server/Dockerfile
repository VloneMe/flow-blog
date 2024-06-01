FROM node:18-alpine

WORKDIR /server/

COPY package*.json .

RUN yarn install

COPY . .

CMD [ "yarn", "run", "dev" ]