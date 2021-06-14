FROM node:15.12.0-alpine

RUN set -x \
    && chmod 775 /usr/local/bin/* \
    && chmod +x /usr/local/bin/*.sh \
    && mkdir /server

WORKDIR /server
COPY . /

EXPOSE 3000

RUN apk add --no-cache git

RUN npm install

CMD npm run dev