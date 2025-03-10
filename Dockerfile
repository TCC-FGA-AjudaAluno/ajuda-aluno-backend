FROM node:22

WORKDIR /opt/app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY tsconfig* .

COPY nest-cli.json .

COPY src ./src

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]