# ui-service/Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:20 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build-time arguments for environment variables
ARG REACT_APP_PUBLIC_VAPID_KEY

# Set environment variables for the build
ENV REACT_APP_PUBLIC_VAPID_KEY=${REACT_APP_PUBLIC_VAPID_KEY}

# Build the React application
RUN npm run build

# Use a lightweight web server to serve the static files
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
