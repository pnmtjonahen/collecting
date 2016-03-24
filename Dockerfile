FROM http-server
COPY app content
VOLUME content/data
WORKDIR content
