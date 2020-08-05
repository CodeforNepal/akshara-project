FROM node:14.5.0-alpine3.12
# Install git dependency
RUN apk --update add git less openssh && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*
# Without this unicode filename won't work correctly
RUN git config --global core.quotePath false
RUN git config --global user.email "contact@sangraha.org"
RUN git config --global user.name "Sangraha Kaamdaar (API)"
# Setup bhupi
WORKDIR /usr/src/bhupi
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
# Setup ssh keys
RUN mkdir ~/.ssh
RUN mv ./secrets/.ssh/id_rsa* ~/.ssh/
RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
RUN chmod 400 ~/.ssh/id_rsa
EXPOSE 3000
CMD [ "yarn", "start" ]
