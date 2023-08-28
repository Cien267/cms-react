FROM node:16 AS builder

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN yarn install --network-concurrency 1 --no-lockfile

COPY . .

RUN yarn build

FROM docker.citigo.com.vn/templates/frontend:runtime

WORKDIR /usr/share/nginx/html

COPY --from=builder --chown=nginx:nginx /usr/src/app/build/ /usr/share/nginx/html/
