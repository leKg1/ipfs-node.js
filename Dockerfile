FROM node:12-alpine
WORKDIR /ipfs-app
COPY ["package.json", "./"]
RUN apk update && apk add git
RUN yarn install --production
COPY . .
CMD ["node", "src/index.js"]