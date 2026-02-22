# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of backend code
COPY . .

# Expose backend port
EXPOSE 3001

# Print info message and start the server
CMD sh -c 'echo ">~~~~~~~~~~~Backend: http://localhost:3001/api/aquatic-resources ~~~~~~~~~~~<" && node server.js'