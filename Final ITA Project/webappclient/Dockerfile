# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
FROM golang:latest
RUN mkdir -p /usr/src/github.com/pdavenport/webapp
WORKDIR /usr/src/github.com/pdavenport/webapp/
COPY . .
RUN go get "github.com/go-sql-driver/mysql"
RUN go build -o main .

# Document that the container uses port 8080
EXPOSE 8080
# Document that the container uses port 5432
EXPOSE 3306

CMD ["./main"]