FROM node:14-alpine as build-step
COPY . ./app
WORKDIR /app
RUN npm install
RUN npm run build:prod
# Stage 2
FROM nginx:1.19.3-alpine
# RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/www /usr/share/nginx/html
# COPY --from=build-step /app/conf /etc/nginx
