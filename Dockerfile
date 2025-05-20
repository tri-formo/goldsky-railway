# Build stage
FROM node:18-alpine AS builder

# Install curl and other dependencies
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine

# Install curl and other dependencies
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Install Goldsky CLI
RUN curl https://goldsky.com > goldsky_script.sh && sh goldsky_script.sh -f

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
