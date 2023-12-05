FROM node:18

WORKDIR /app

COPY . ./

RUN cd /app/frontend && npm install

RUN cd /app/frontend && npm run build


CMD cd /app/frontend && npm start

EXPOSE 3000