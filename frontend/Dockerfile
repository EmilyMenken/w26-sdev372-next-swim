# Stage 1: Build
FROM node:20-bullseye AS build
WORKDIR /app

# Install build tools for native modules
RUN apt-get update && \
    apt-get install -y python3 make g++ bash curl git libc++-dev libfreetype6 libfontconfig1 && \
    rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package*.json ./
ENV ROLLUP_IGNORE_OPTIONAL_NATIVE=1
RUN npm install --force

# Copy all source code and configs needed for build & tests
COPY src ./src
COPY public ./public
COPY vite.config.ts ./vite.config.ts
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.app.json ./tsconfig.app.json
COPY tsconfig.node.json ./tsconfig.node.json
COPY index.html ./index.html
COPY vitest.config.js ./vitest.config.js
COPY vitest.setup.ts ./vitest.setup.ts

# Run frontend tests BEFORE build
ARG CACHEBUST=1
RUN echo "CACHEBUST=$CACHEBUST" && npm run test

# Build frontend
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]