ARG GOLDSKY_TOKEN
ARG TINYBIRD_URL="abc.com"

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

# Install goldsky cli
RUN curl https://goldsky.com > goldsky_script.sh && sh goldsky_script.sh -f

# Builds the TypeScript code into JavaScript.
RUN npm run build

# Create entrypoint script
RUN echo '#!/bin/sh\n\
sh /express-api/scripts/login-goldsky.sh\n\
exec "$@"' > /entrypoint.sh && chmod +x /entrypoint.sh

# Set environment variables
ENV NODE_ENV="production"
ENV GOLDSKY_TOKEN=${GOLDSKY_TOKEN}
ENV TINYBIRD_URL=${TINYBIRD_URL}
ENV ALCHEMY_URL="alchemy.com.vn"

# Run the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]

# Run the start script
CMD ["npm", "run", "start"]