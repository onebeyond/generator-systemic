# svc-example
An example service using

* [systemic](https://github.com/guidesmiths/systemic)
* [confabulous](https://github.com/guidesmiths/confabulous)
* [prepper](https://github.com/guidesmiths/prepper)
* [systemic-express](https://github.com/guidesmiths/systemic-express)
* [systemic-mongo](https://github.com/guidesmiths/systemic-mongo)
* [systemic-redis](https://github.com/guidesmiths/systemic-redis)
* [systemic-pg](https://github.com/guidesmiths/systemic-pg)

## Features
* Environmental config
* Secrets obtained from a vault server
* Automatically re-initialises when config changes
* Orderly startup / shutdown (establishes database connections before setting up http listeners and vice versa)
* Graceful shutdown on unhandled exceptions, SIGINT and SIGTERM
* Useful log decorators, including request scoped logging
* JSON logging to stdout in "proper" environments, human friendly logging locally
* A Dockerfile that uses settings from .npmrc and .nvmrc
* The Dockerfile cache busts using package.json and shrinkwrap.json so npm install only runs when necessary
* Deployed artifact (the container image) is traceable back to SCM commit via manifest.json, exposed via /manifest endpoint

## Use of domains
Domains have been deprecated, but as yet there's no alternative way to catch unhandled exceptions. This service will have to be updated when a new API emerges

## Use of docker
The example uses mongo on localhost:27017 and vault on localhost:8200. The easiest way to standup a test environment is with docker compose
```
docker network create local
docker-compose --file docker/docker-compose-local.yml up -d
```

## Configuring Vault
This example uses vault to hold secure secrets. You will need to configure vault before the example service will start. To do this...

1. View the vault logs

        docker logs vault

1. Make note of the Root Token and export the following environment variables

        export VAULT_ADDR=http://vault:8200
        export VAULT_TOKEN=<INSERT_TOKEN_HERE>

1. Create an alias so you can execute vault commands from a container

        alias vaultcmd="docker run --volume $(pwd)/conf/vault:/tmp --link vault --net example --rm -e VAULT_ADDR -e VAULT_TOKEN sjourdan/vault"

1. Upload a policy

        vaultcmd policy-write example-live /tmp/policies/live/example.json

1. Configure an app-id login

        vaultcmd auth-enable app-id
        vaultcmd write auth/app-id/map/app-id/svc-example value=example-live display_name=svc-example
        vaultcmd write auth/app-id/map/user-id/example-live value=svc-example
        vaultcmd policy-write example-live /tmp/policies/live/example.json

## Running locally
```
npm start
```

## Running tests
```
npm test
```

## In container build, test and publish
```
docker-compose -f docker/docker-compose-build.yml build
docker-compose -f docker/docker-compose-build.yml run --rm -e SERVICE_ENV=build svc-example node_modules/.bin/mocha tests
docker-compose -f docker/docker-compose-build.yml stop
docker tag quay.io/guidesmiths/svc-example:latest quay.io/guidesmiths/svc-example:$COMMIT
docker push quay.io/guidesmiths/svc-example
```

