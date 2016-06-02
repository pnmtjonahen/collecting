# Collecting application
# docker build -t tjonahen/collecting .
# docker run -d -p 5001:3000 --name=collecting --restart=always -v /home/ordina/collecting/mamiya:/data tjonahen/collecting
# VERSION 1.0.0
FROM node
MAINTAINER Philippe Tjon-A-Hen <philippe.tjonahen.nl>

ARG COLLECTING_HOME=/collecting
ARG user=collecting
ARG group=collecting
ARG uid=1000
ARG gid=1000

RUN groupadd -g ${gid} ${group} \
    && useradd -d ${COLLECTING_HOME} -u ${uid} -g ${gid} -m -s /bin/bash ${user}

USER ${user}

RUN git clone --single-branch https://github.com/pnmtjonahen/collecting.git ${COLLECTING_HOME}/dist

WORKDIR ${COLLECTING_HOME}/dist
RUN npm install --production && ./node_modules/bower/bin/bower install && ln -s /collecting/dist/data /data

EXPOSE 3000
VOLUME /data

ENTRYPOINT npm start