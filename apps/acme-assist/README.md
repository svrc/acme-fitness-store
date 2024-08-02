==========================TO BE DELETED
# Enhance with Azure OpenAI

## Prerequisites
- JDK 17
- Maven
- Azure CLI (>= 2.51.0)
- An Azure subscription with access granted to Azure OpenAI (see more [here](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR7en2Ais5pxKtso_Pz4b1_xUOFA5Qk1UWDRBMjg0WFhPMkIzTzhKQ1dWNyQlQCN0PWcu))


## Prepare the Environment Variables
1. Please navigate to the root folder of this cloned repository.
1. Run `cp azure-spring-apps-enterprise/scripts/setup-env-variables-template.sh azure-spring-apps-enterprise/scripts/setup-env-variables.sh` and update the values in `setup-env-variables.sh` with your own values.
1. Run `cp azure-spring-apps-enterprise/scripts/setup-ai-env-variables-template.sh azure-spring-apps-enterprise/scripts/setup-ai-env-variables.sh` and update the values in `setup-ai-env-variables.sh` with your own values.

======================================= TO be deleted

## Local running

Ensure the Local Development dependency is setup running (ie. local config server)

This application also assumes there is an OPEN AI API key setup as an environment variable. 
Need to set `OPENAI_API_KEY` for the application-local.yml

run locally setting up docker for dependency
```bash
docker-compose up
./mvnw -e spring-boot:run -Dspring-boot.run.profiles=local
```

## (Optional) Preprocess the data into the vector store

Before building the `assist-service` service, we need to preprocess the data into the vector store. The vector store is a file that contains the vector representation of each product description. There's already a pre-built file `vector_store.json` in the repo so you can skip this step. If you want to build the vector store yourself, please run the following commands:
```bash
source ./azure-spring-apps-enterprise/scripts/setup-ai-env-variables.sh
cd apps/acme-assist
./preprocess.sh data/bikes.json,data/accessories.json src/main/resources/vector_store.json
```
