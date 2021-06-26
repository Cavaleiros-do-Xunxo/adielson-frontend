FROM nginx:alpine

COPY build /usr/share/nginx/html

RUN chmod -R 664 /usr/share/nginx/html/assets
RUN chmod -R a+X /usr/share/nginx/html/assets