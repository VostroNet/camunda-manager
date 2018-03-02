FROM node:8-alpine

ENV NODE_ENV production

ENV DEBUG *web-auth::* 

RUN apk update && apk upgrade && apk add --update ca-certificates python hiredis-dev make g++ 

RUN update-ca-certificates

RUN mkdir -p /app/build/

WORKDIR /app/

COPY package.json ./

RUN yarn install --production

RUN apk del make g++ && \
  rm /var/cache/apk/*

COPY /build ./build/

COPY config.js ./

COPY requests.proto ./

CMD node --max_old_space_size=16384 ./build/index.js
