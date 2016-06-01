# Collecting application
# docker build -t tjonahen/collecting .
# docker run -d -p 5001:3000 --name=collecting --restart=always -v /home/ordina/collecting/mamiya:/data tjonahen/collecting
# VERSION 1.0.0
FROM node
MAINTAINER Philippe Tjon-A-Hen <philippe.tjonahen.nl>
RUN git clone --single-branch https://github.com/pnmtjonahen/collecting.git
WORKINGDIR /collecting
RUN npm install --production && ln -s /collecting/dist/data /data
EXPOSE 3000
VOLUME /data
WORKINGDIR /collecting/dist
ENTRYPOINT npm start