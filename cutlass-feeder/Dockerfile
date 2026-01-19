FROM golang:1.25.5-alpine AS builder

# Set environment variables
ENV CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Set working directory inside the container
WORKDIR /build

# Copy go.mod and go.sum files for dependency installation
COPY go.mod ./src ./

# Download dependencies
# RUN go mod download

# Copy the entire application source
COPY . .

# Build the Go binary
RUN go build -o /cutlass-go .

# Final lightweight stage
FROM alpine:3.21 AS final

# Copy the compiled binary from the builder stage
COPY --from=builder /cutlass-go /bin/cutlass-go

# Expose the application's port
#EXPOSE 8000

# Run the application
#CMD ["bin/cutlass-go"]