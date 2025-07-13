# Use a lightweight Node.js image for building (customizable via ARG)
FROM node:24-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json ./

# Install project dependencies using npm ci (ensures a clean, reproducible install)
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the rest of the application source code into the container
COPY . .

# Build the Angular application
RUN npm run build

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================

FROM nginxinc/nginx-unprivileged:alpine AS runner

# Use a built-in non-root user for security best practices
USER nginx

# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html

# Copy the script into the image
COPY env-config.sh /usr/share/nginx/html/assets/env-config.sh
# Make sure it's executable
RUN chmod +x /usr/share/nginx/html/assets/env-config.sh

# Expose port 8080 to allow HTTP traffic
# Note: The default NGINX container now listens on port 8080 instead of 80
EXPOSE 8080

# Start Nginx directly with custom config
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/assets/env-config.sh && nginx -g 'daemon off;'"]
