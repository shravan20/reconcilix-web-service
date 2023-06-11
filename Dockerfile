FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=root
ENV DB_NAME=bitespeed

EXPOSE 3000

CMD ["npm", "start"]
