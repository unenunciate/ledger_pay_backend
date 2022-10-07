# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:16.17.0

# A directory within the virtualized Docker environment
WORKDIR /usr/src/app

# Copies package.json and package-lock.json to Docker environment
# COPY package*.json ./
COPY package*.json ./

# Installs all node packages
# RUN corepack enable && yarn install
RUN corepack enable yarn && yarn install --production

# Copies everything needed over to Docker environment
COPY . .

# Remove .cache
RUN rm -rf /usr/local/share/.cache && rm -rf /tmp/*

# Uses port which is used by the actual application
EXPOSE 3000 1337

# Finally runs the application
CMD [ "yarn", "start" ]