FROM gcc:latest
WORKDIR /usr/src/hello
COPY hello.c ./
RUN gcc -o hello hello.c
CMD ["./hello"]