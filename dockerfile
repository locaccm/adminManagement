FROM node:20-alpine

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

RUN apk add --no-cache git

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run generate

RUN npm run build

EXPOSE 4000


CMD ["npm", "start"]
