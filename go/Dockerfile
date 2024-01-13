FROM golang:latest
WORKDIR /usr/src/hello
# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod ./
RUN go mod download

COPY hello.go ./
RUN go build -o /usr/local/bin/hello ./...

CMD ["hello"]