# Stage 1: Build
FROM node:20-bullseye AS build
WORKDIR /app

# Install build tools for optional native modules
RUN apt-get update && \
    apt-get install -y python3 make g++ bash curl git && \
    rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Force Rollup to skip optional native binaries
ENV ROLLUP_IGNORE_OPTIONAL_NATIVE=1

# Install dependencies
RUN npm install --force

# Copy source code
COPY src ./src
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./

# Build frontend
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]