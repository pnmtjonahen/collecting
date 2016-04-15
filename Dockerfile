# Collecting application
# docker build -t tjonahen/collecting .
# docker run -d -p 5001:80 --name=collecting --restart=always -v /home/ordina/collecting/mamiya:/content/data tjonahen/collecting
# VERSION 1.0.0
FROM tjonahen/http-server
MAINTAINER Philippe Tjon-A-Hen <philippe.tjonahen.nl>
COPY app content
VOLUME content/data
WORKDIR content
