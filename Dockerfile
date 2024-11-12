FROM node:lts
WORKDIR /app
ENV NODE_ENV=build
COPY package.json package-lock.json lerna.json ./
COPY workspaces ./workspaces
RUN ["npm", "ci"]
RUN ["npm", "run", "build"]
