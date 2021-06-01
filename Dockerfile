FROM node:14.16.1-buster-slim

EXPOSE 3000

WORKDIR /app

COPY . ./

RUN npm install --force
RUN npm run build

ENTRYPOINT ["node", "server.js"]