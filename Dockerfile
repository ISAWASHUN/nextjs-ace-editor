FROM php:8.2-fpm
WORKDIR /usr/src/app
COPY . .
CMD [ "php", "-S", "0.0.0.0:8000", "-t", "." ]
