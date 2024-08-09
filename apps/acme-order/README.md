# ACME Order Service

Requires DotNet version 8.

## Getting Started

Download donet
https://dotnet.microsoft.com/en-us/

In Visual Studio Code
Download the DotNet C# Dev Kit extension
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit

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


###
Build deployable

```bash
dotnet publish -r linux-x64
```
