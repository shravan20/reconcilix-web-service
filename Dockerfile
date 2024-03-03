FROM node:14

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y mysql-client


COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN chmod +x init-db.sh
COPY init-db.sh ./


ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=root
ENV DB_NAME=bitespeed

EXPOSE 3000

CMD ["npm", "start"]
