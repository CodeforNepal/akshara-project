FROM node:carbon-alpine

ADD . /frontend

WORKDIR /frontend

# Install Dependencies
RUN yarn
RUN node node_modules/simplehttp2server/lib/install.js

# Build
RUN yarn build

EXPOSE 8080

CMD yarn serve
