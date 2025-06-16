FROM node:20-alpine

# Environment variable for your database connection
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Auth service environment variable 
ARG AUTH_SERVICE_URL
ENV AUTH_SERVICE_URL=${AUTH_SERVICE_URL}

# CORS origin 
ARG CORS_ORIGIN
ENV CORS_ORIGIN=${CORS_ORIGIN}

# Set working directory
WORKDIR /app

# Install git 
RUN apk add --no-cache git

# Install dependencies 
COPY package*.json ./
RUN npm install

COPY .gitmodules ./
COPY . .

# Initialize git submodules 
RUN git submodule update --init --recursive

# Generate Prisma client 
RUN npx prisma generate --schema=prisma/schema.prisma

# Build your project
RUN npm run build

# Expose your application port 
EXPOSE 3000

# Start your app
CMD ["npm", "start"]
