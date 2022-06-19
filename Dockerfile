FROM node:16-alpine as node-server

RUN npm install --location=global ts-node pnpm

WORKDIR /usr/src/app

COPY ["package.json", "pnpm-lock.yaml", "./"]

COPY . .

RUN pnpm install

ENV NODE_ENV=production

RUN pnpm m:gen -- src/migrations/InitDB
RUN pnpm m:run

EXPOSE 3000

CMD ["npm", "start"]