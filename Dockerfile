# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the frontend code
COPY . .

# Specify the command to start the frontend server
CMD ["yarn", "start"]