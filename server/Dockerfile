FROM node:14-alpine

ADD . .
RUN npm ci

EXPOSE 8080
CMD ["node", "app.js"]
