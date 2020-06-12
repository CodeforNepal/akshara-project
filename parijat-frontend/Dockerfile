FROM node:erbium-alpine

ADD . /frontend

WORKDIR /frontend

# Install Dependencies
RUN yarn

# Build
RUN yarn build

EXPOSE 8080

CMD yarn serve
