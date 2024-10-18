FROM --platform=linux/x86_64 node:22

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
RUN npm install
EXPOSE 3000

ENTRYPOINT ["npm","run","start"]
