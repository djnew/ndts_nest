FROM node:16-alpine

WORKDIR /var/www

COPY ["./package*", "/var/www/"]

RUN npm install

COPY . /var/www

RUN npm run build

EXPOSE 5000

CMD ["yarn", "start:prod"]
