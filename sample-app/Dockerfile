# Use an official Node runtime as a base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Define command to run the app
CMD ["npm", "run", "start"]