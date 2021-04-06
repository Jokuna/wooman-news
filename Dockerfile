FROM node:14.16.0-alpine3.13
# make the starting directory the current one
WORKDIR /usr/src/app
COPY . .
# install the dependencines within the app
RUN npm install pm2 -g && yarn install && yarn build

# Start the node app 
CMD ["pm2-runtime", "start", "ecosystem.config.json"]