# Use an official Node.js runtime as the base image for the build stage
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package*.json pnpm-lock.yaml ./

# Install application dependencies
RUN pnpm install --frozen-lockfile

# Copy the entire application code to the working directory
COPY . .

# Build the frontend application
# RUN pnpm run build

# # Use a lightweight web server as the base image for the final stage
# FROM nginx:alpine

# # Copy the built frontend files to the web server root
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose the default port for HTTP traffic
# EXPOSE 80

# # Start the web server
# CMD ["nginx", "-g", "daemon off;"]

EXPOSE 3000
CMD ["npm", "start"]
