# ACME Fitness Store

ACME Fitness store is a fictional online retailer selling sporting goods. This repo contains the source code and deployment scripts for the ACME Fitness store application.

## High Level Architecture

This application is composed of several services:

* 4 Java Spring Boot applications:
  * A catalog service for fetching available products. 
  * A payment service for processing and approving payments for users' orders
  * An identity service for referencing the authenticated user
  * An assist service for infusing AI into fitness store

* 1 Python application:
  * A cart service for managing a users' items that have been selected for purchase

* 1 ASP.NET Core applications:
  * An order service for placing orders to buy products that are in the users' carts

* 1 NodeJS and static HTML Application
  * A frontend shopping application

The sample can be deployed to Azure Spring Apps Enterprise or Tanzu Application Platform. 

## Repo Organization

| Directory                                                        | Purpose |
| ---------------------------------------------------------------- | ------------- |
| [apps/](./apps)                                                   | source code for the services  |

## DRAFT Deploy on Tanzu Platform for Cloud Foundry (TPCF aka TAS) - incomplete

```
cf create-service p.redis on-demand-cache acme-redis 
cf create-service postgres on-demand-postgres-db acme-postgres
cf create-service postgres on-demand-postgres-db acme-assist-postgres
cf create-service postgres on-demand-postgres-db acme-order-postgres       
cf create-service p.config-server standard acme-config  -c  '{ "git": { "uri": "https://github.com/svrc/acme-fitness-store-config" }}'
cf create-service p-identity uaa acme-sso   
cf create-service p.service-registry standard acme-registry  
cf create-service p.gateway standard acme-gateway -c '{"sso": { "plan": "uaa", "scopes": ["openid", "profile", "email"] }, "host": "acme-fitness" ,"cors": { "allowed-origins": [ "*" ] }}'
cf create-service genai shared genai

cd acme-identity
./gradlew assemble
cf push --no-start
cf bind-service acme-identity acme-registry
cf bind-service acme-identity acme-sso
cf bind-service acme-identity acme-config 
cf bind-service acme-identity acme-gateway -c identity-routes.json
cf start acme-identity

cd ../acme-cart
cf push --no-start
cf bind-service acme-cart acme-redis
cf bind-service acme-cart acme-gateway -c cart-routes.json
cf start acme-cart

cd ../acme-payment
./gradlew assemble
cf push --no-start
cf bind-service acme-payment acme-registry
cf bind-service acme-payment acme-config
cf bind-service acme-payment acme-gateway -c pay-routes.json
cf start acme-payment

cd ../acme-catalog
./gradlew clean assemble
cf push --no-start
cf bind-service acme-catalog acme-registry
cf bind-service acme-catalog acme-config
cf bind-service acme-catalog acme-postgres
cf bind-service acme-catalog acme-gateway -c catalog-service_rate-limit.json
cf start acme-catalog

cd ../acme-assist
./mvnw clean package -DskipTests
cf push --no-start --var EMBEDDING_OPEN_AI_API_KEY=<your-open-ai-key>
cf bind-service acme-assist acme-registry
cf bind-service acme-assist acme-assist-postgres
cf bind-service acme-assist genai 
cf bind-service acme-assist acme-gateway -c assist-routes.json
cf start acme-assist

cd ../acme-order
dotnet publish -r linux-x64
cf push --no-start
cf bind-service acme-order acme-order-postgres
cf bind-service acme-order acme-gateway -c order-routes.json
cf start acme-order

cd ../acme-shopping
cf push --no-start
cf bind-service acme-shopping acme-gateway -c frontend-routes.json
cf start acme-shopping
```

Note: ensure that the environment variable for TAS has 
`SPRING_MVC_STATIC_PATH_PATTERN: /static/images/**` set.  Currently have an issue with the value taken from config server being overwritten.

## Local Development setup

### Config server
Config in TAS is created by a Repo backed tile. Locally instead will be spring boot config server run locally on port 8888.
```bash
cd local-development/config-server
./mvnw -e spring-boot:run -Dspring-boot.run.profiles=local
```

### Discovery server
Spring boot apps (Identify, Catalog, Payment, Assist) communicate via TAS service registry. For local development, a local instance of Eureka discovery server can be used to enable communication between apps.

```bash
cd local-development/discovery-server
./gradlew bootRun
```

### Spring Cloud Gateway Server

Obtain from Broadcom download portal to get the Spring Commercial Gateway Jar for running local.
Place the jar named as `gateway-2.2.4.jar` into the directory `local-development/spring-cloud-gateway` 
```bash
local-development/spring-cloud-gateway
chmod u+x run.sh
./run.sh
```

### Tanzu Local Authentication Server
Obtain from Broadcom download portal to get the Tanzu Authentication Server Jar for running it.
 
```bash
java -jar tanzu-local-authorization-server.jar
```
In the `local-development/spring-cloud-gateway/scg-config.yml` Ensure the Authorization server is referenced.
```yaml
spring:
  security: #Obtained from Local Spring Authorization
    oauth2:
      client:
        provider:
          sso:
            issuer-uri: http://localhost:9000

```

### Boot up each of the local application following their README

- [acme-assist](apps/acme-assist/README.md)
  - local docker compose dependency
  - start locally via maven wrapper / IDE (with `local` active profile)
- [acme-cart](apps/acme-cart/README.md)
  - build local running image
  - local docker compose to run locally
- [acme-catalog](apps/acme-catalog/README.md)
  - local docker compose dependency
  - start locally via gradle wrapper or / IDE (with `local` active profile)
- [acme-identity](apps/acme-identity/README.md)
  - start locally via gradle wrapper or / IDE (with `local` active profile)
- [acme-order](apps/acme-order/README.md)
  - local docker compose dependency
  - DotNet run or start via IDE
- [acme-payment](apps/acme-payment/README.md)
  - start locally via gradle wrapper or / IDE (with local property)
- [acme-shopping](apps/acme-shopping/README.md)
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


## TAS Development Tricks

### Connecting to Database

https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-services.html

`cf ssh -L 65432:{host-of-database-on-TAS}:5432 {application-name}`
