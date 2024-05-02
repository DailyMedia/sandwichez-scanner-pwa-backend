# Use the official Node.js 14 image as base
FROM node:14

# Set default environment to development: dev or prod
ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN if [ "$NODE_ENV" = "dev" ]; then npm install -g nodemon; fi

# Copy the rest of the application files to the container
COPY . .
# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"dev\" ]; then npm run dev; else node app.js; fi"]

#CMD ["nodemon", "app.js"]

#PARA EJECUTARLO USAR ESTOS PASOS
# Estar en el directorio "Root"
# docker build --build-arg NODE_ENV=dev --no-cache -t sandwichez-be .
# docker run -p 3000:3000 -d --name sandwichez-be -v /c/media/sandwitchez-scanner-poc-backend:/usr/src/app sandwichez-be