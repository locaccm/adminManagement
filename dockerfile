FROM node:20-alpine

# Database connection string (Prisma)
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Auth service URL (can be unused)
ARG AUTH_SERVICE_URL
ENV AUTH_SERVICE_URL=${AUTH_SERVICE_URL}

# CORS origin
ARG CORS_ORIGIN
ENV CORS_ORIGIN=${CORS_ORIGIN}

# App port (optional, set via env)
ARG PORT
ENV PORT=${PORT}

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# (Optional) Pull database schema from remote (Prisma) if needed
RUN npm run dbpull

# Generate Prisma client (required for Prisma ORM)
RUN npm run generate

# Build your project (TypeScript, etc)
RUN npm run build

# Expose the app port (default 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
