FROM node:18

WORKDIR /app

COPY . ./

RUN cd /app/backend && npm install

RUN cd /app/backend && rm -rf /app/backend/dist &&  npm run build

CMD cd /app/backend && npm run start:prod

EXPOSE 8001