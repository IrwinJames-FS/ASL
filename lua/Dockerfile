#https://stackoverflow.com/questions/40708771/running-lua-script-in-docker
#provides a method to use the official lua distro from a linux machine
FROM debian:latest
RUN apt-get -y update && apt-get -y install lua5.1
WORKDIR /usr/src/hello
COPY hello.lua ./
CMD ["lua", "hello.lua"]