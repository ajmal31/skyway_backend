# Base Image Version 
FROM node:18-alpine

# Creating new dir in the container
WORKDIR /app

# copy package.json
COPY package*.json ./

# install all dependencies 
RUN npm install

# copy rest of the files
COPY . .

ENV PORT = 5003

CMD ["npm","start"]
