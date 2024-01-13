FROM rust:latest
WORKDIR /usr/src/hello
COPY . .
RUN cargo install --path .
RUN cargo build --release
CMD ./target/release/hello
