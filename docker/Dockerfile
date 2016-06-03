# Collecting application
# docker build -t tjonahen/collecting .
# docker run -d -p 5001:3000 --name=collecting --restart=always -v /home/ordina/collecting/mamiya:/data tjonahen/collecting
# VERSION 1.0.0
FROM node
MAINTAINER Philippe Tjon-A-Hen <philippe.tjonahen.nl>


COPY dist /collecting/dist

WORKDIR /collecting/dist
RUN npm install --production &&  ln -s /collecting/dist/data /data

EXPOSE 3000
VOLUME /data

ENTRYPOINT npm start