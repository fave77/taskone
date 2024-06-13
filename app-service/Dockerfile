# app-service/Dockerfile
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

# Expose port 8080 to the outside world
EXPOSE 8080

# Start Node.js app when the container launches
CMD ["npm", "start"]
