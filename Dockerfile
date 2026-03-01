# Use lightweight Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose service port (optional if needed later)
EXPOSE 3000

# Start service
CMD ["node", "src/subscriber.js"]
