### Config server
Config in TAS is created by a Repo backed tile. For local development, included [docker-compose.yml](docker-compose.yaml) will start up an instance of config-server on port 8888.

```bash
cd local-development
docker compose up -d config
```

### Discovery server
Spring boot apps (Identify, Catalog, Payment, Assist) communicate via TAS service registry. For local development, included [docker-compose.yml](docker-compose.yaml) starts up a local instance of Eureka discovery server on port 8761.

```bash
cd local-development
docker compose up -d discovery
```

### Tanzu Local Authentication Server
Follow the instructions on ["Getting Started with Tanzu Local Authorization Server"](https://docs.vmware.com/en/Tanzu-Spring-Runtime/Commercial/Tanzu-Spring-Runtime/local-auth-server-about-local-auth-server.html) page to obtain the jar executable from Broadcom download portal.

Place the jar named as `tanzu-local-authorization-server-beta4.jar` into the directory `local-development/spring-cloud-gateway`.

Given jar is placed correctly, included [docker-compose.yml](docker-compose.yaml) starts up a local instance of Tanzu Local Authentication Server on port 9000.

```bash
cd local-development
docker compose up -d auth
```

### Spring Cloud Gateway Server

Obtain from Broadcom download portal to get the Spring Commercial Gateway Jar for running local.
Place the jar named as `gateway-2.2.4.jar` into the directory `local-development/spring-cloud-gateway`

Given jar is placed correctly, included [docker-compose.yml](docker-compose.yaml) starts up a local instance of Spring Cloud Gateway Server on port 8090.

```bash
cd local-development
docker compose up -d gateway
```

> **Additional information:**  
> In the [docker-compose.yaml](docker-compose.yaml) under local-development folder, ensure the Authorization server is referenced.
> ```yaml
>   gateway:
>     ...
>     environment:
>       SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_SSO_ISSUER_URI: http://auth:9000
> ```

### Boot up each of the local application following their README

- [acme-cart](../apps/acme-cart/README.md)
    - build local running image
    - local docker compose to run locally
- [acme-catalog](../apps/acme-catalog/README.md)
    - local docker compose dependency
    - start locally via gradle wrapper or / IDE (with `local` active profile)
- [acme-assist](../apps/acme-assist/README.md)
    - local docker compose dependency
    - start locally via maven wrapper / IDE (with `local` active profile)
- [acme-identity](../apps/acme-identity/README.md)
    - start locally via gradle wrapper or / IDE (with `local` active profile)
- [acme-payment](../apps/acme-payment/README.md)
    - start locally via gradle wrapper or / IDE (with local property)
- [acme-order](../apps/acme-order/README.md)
    - local docker compose dependency
    - DotNet run or start via IDE
- [acme-shopping](../apps/acme-shopping/README.md)
    - `npm install` and `npm run start`

### Local Development Ports
```
localhost:8080 - acme-shopping - Frontend
localhost:8081 - acme-assist - SpringBoot - AI integtegration
localhost:8082 - acme-catalog - SpringBoot - CrudRepository
localhost:8083 - acme-identity - SpringBoot - Token Resource server
localhost:8084 - acme-payment - SpringBoot -  Service related to checkout
localhost:8085 - acme-cart - Python server -  Service for Management of Cart
localhost:8086 - acme-order - DotNet application
localhost:8090 - spring-cloud-gateway 
localhost:8761 - local discovery server
localhost:8888 - spring local config server 
localhost:9000 - spring local authorization 
```
