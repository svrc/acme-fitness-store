## Local running

Ensure the Local Development dependencies are running. (See main [README](../../README.md))

This application also assumes there is an OPEN AI API key setup as an environment variable. 
Need to set `OPENAI_API_KEY` for the application-local.yml

This project uses Java version 21. Ensure your system has this available before running the app locally.

run locally setting up docker for dependency
```bash
docker-compose up
./mvnw -e spring-boot:run -Dspring-boot.run.profiles=local
```

## (Optional) Preprocess the data into the vector store

Before building the `assist-service` service, we need to preprocess the data into the vector store. The vector store is a file that contains the vector representation of each product description. There's already a pre-built file `vector_store.json` in the repo so you can skip this step. If you want to build the vector store yourself, please run the following commands:
```bash
cd apps/acme-assist
./preprocess.sh data/bikes.json,data/accessories.json src/main/resources/vector_store.json
```
