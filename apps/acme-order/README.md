# ACME Order Service

## Getting Started

To run the acme order service, do the following:

Start the mongodb container:

```bash
    docker compose up -d
```

Start the application:

```bash
    dotnet run --urls=http://localhost:8086/
```

Verify the health of the application:

```bash
    open localhost:8086/actuator/health
```