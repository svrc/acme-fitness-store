# Catalog


> A Catalog service, used to service the bikes and accessories sold by acme fitness

The goal of this specific service is to keep track of bikes and accessories. 

Catalog contains a database it talks to store the information it needs.

### Run

* [Docker](https://www.docker.com/docker-community)


## Local running

Ensure the local development dependencies are running. (See main [README](../../README.md))

Setup Docker database dependency

`docker compose -d up`

To run locally


`./gradlew bootRun --args="--spring.profiles.active=local"`

