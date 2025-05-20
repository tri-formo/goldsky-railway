# Use the Node official image
# https://hub.docker.com/_/node
FROM node:lts

# Create and change to the app directory.
WORKDIR /express-api

# Copying these files separately allows Docker to cache npm install step.
COPY package*.json ./

#  Executes npm install inside the container to install all dependencies defined in package.json.
RUN npm install

# Copy local code to the container image. This happens after npm install to leverage Docker's layer caching.
COPY . ./

# Builds the TypeScript code into JavaScript.
RUN npm run build

# Serve the app
CMD ["npm", "run", "start"]