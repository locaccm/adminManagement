FROM node:20-alpine

# Environment variable for your database connection
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# CORS origin (for controlling who can access your API)
ARG CORS_ORIGIN
ENV CORS_ORIGIN=${CORS_ORIGIN}

# Set working directory
WORKDIR /app

# Install git (for pulling submodules, if needed)
RUN apk add --no-cache git

# Install dependencies (do this first for better Docker caching)
COPY package*.json ./
RUN npm install

# Copy git submodules definition, if your repo uses them (otherwise, you can remove the next 2 lines)
COPY .gitmodules ./
COPY . .

# Initialize git submodules (if needed; remove if not using submodules)
RUN git submodule update --init --recursive

# Generate Prisma client (make sure the path matches your structure)
RUN npx prisma generate --schema=prisma/schema.prisma

# Build your project (if using TypeScript or a build step)
RUN npm run build

# Expose your application port (change if your app listens on another port)
EXPOSE 4000

# Start your app
CMD ["npm", "start"]
