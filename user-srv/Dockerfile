# Node base alpine linux distribution image version
FROM node:18-alpine

# Creating New work dir
WORKDIR /app

# Copy pcakge.json for next command
COPY package.json ./

# Install all dependencies
RUN npm install

# Copy Rest of the files
COPY . .

# Port
ENV PORT =300

# Application running command
CMD ["npm","start"]