FROM node:current-alpine3.12

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build
ENV CATSERVER="192.168.1.222"

EXPOSE 3081
CMD [ "http-server", "--proxy", "http://localhost:3081?", "-p", "3081", "dist" ]