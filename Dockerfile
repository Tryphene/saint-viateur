# frontend/Dockerfile
FROM node:18.15.0-alpine3.17 AS prod

WORKDIR /app

COPY . /app

RUN npm ci

#COPY . /app

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/local/bin

COPY --from=prod /app/build /usr/share/nginx/html

#COPY generate-config.sh .

#COPY custom-nginx.template /etc/nginx/conf.d/

#RUN chmod +x generate-config.sh

EXPOSE 80

#ENTRYPOINT [ "/bin/sh", "generate-config.sh"]
