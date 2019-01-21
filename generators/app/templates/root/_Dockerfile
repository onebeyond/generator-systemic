FROM node:10.4

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
ADD .npmrc ./.npmrc

RUN npm install

# Bundle app source
COPY . .

EXPOSE 4000

RUN npm run manifest

CMD [ "npm", "start" ]
