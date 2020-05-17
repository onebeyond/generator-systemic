# <%= name %>

<%= description %>

### Main bits
- Separation of concerns using the [Hexagonal Architecture (Ports and Adapters)](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) approach.
- Components and sub-components single responsibility.
- Components and sub-components versioning.
- Multiples business logic workflows.
- Systemic ecosystem npm handy modules (e.g. [systemic-rabbitmq](https://www.npmjs.com/package/systemic-rabbitmq) - [systemic-mongdb](https://www.npmjs.com/package/systemic-mongodb)).

### Workflows
The service is intended to implement a simple businees logic in charge of dealing with the __message__ entity.
Two are the main workflows managed by the businnes logic of the service:
1. asynchronous
    1. the service is subscribed to the rabbitmq bus.
    2. the service receives a new message in the form of `{ id: '1', text: 'Hello World!' }`. 
    3. the service stores the message in a mongodb database (collection: messages) in the form of `{ id: '1', text: 'Hello World!', receptionTimestamp: '2020-05-16T14:41:20.055Z' }`.
2. synchronous
    1. the service exposes a set `/vx/message/{id}` endpoints (v1 and v2).
    2. the service reaches out the mongodb store in order to retrieve the requested message. 
    3. the service gives back a different response according to the different endpoints version:
        1. `/v1/message/1` --> `{ id: '1', text: 'hello world!' }`.
        2. `/v2/message/1` --> `{ id: '1', text: 'HELLO WORLD!', receptionTimestamp: '2020-05-16T14:41:20.055Z' }`.

# COMPONENTS

Stored into the _/components_ folder. Each one of them comes with an __*index.js*__ file that acts as a manifest telling systemic how to wire components but most important in which order starting and stopping them.

### Hierarchy
- __app__: <%= name %> root system (component).
- __logger__: logging utility component.
- __express__: express server component.
- __config__: configuration manager component.
- __routes__: express server routes component.
    - __routes.admin__: admin api routes sub-components.
    - __routes.api.v1__: api v1 routes sub-components.
    - __routes.api.v2__: api v2 routes sub-components.
- __controller__: orchestrator of components, handles the core logic of the Hexagon Architecture.
    - __controller.api.v1__: exposes the v1 business logic needed to manage the api v1 routes requests.
    - __controller.api.v2__: exposes the v2 business logic needed to manage the api v2 routes requests.
    - __controller.bus__: handles the asynchronous api bit of the workflow exposing the business logic needed to manage the requests coming as rabbitmq bus messages.
- __bus__: manages the connection with the rabbitmq bus exposing publishing and subscribing functionalities.
- __store__: manages the connection with the mongodb database exposing storing and retrieving functionalities.

### __app__
The root component defining the service system.

### __logger__
The logging component providing the following logs structure:
```bash
{TIMESTAMP} | {LOG_LEVEL} [{<%= name %>}] | {MESSAGE}
```

### __express__ 
An express server that always comes in handy to expose at least a set of admin endpoints for monitoring purposes.

### __config__ 
The component in charge of mixing and set up the configuration defined into the files of the folder _/config_ in order to come up with the correct configuration for the given run mode:
- default
- local
- test
- build
- prod

### __routes__
The component in charge of specifiyng the routes to be exposed by the express component.

### __routes.admin__
The admin api sub-component in charge of exposing the `/__/manifest` endpoint.

### __routes.api.v1__
The api v1 sub-component in charge of exposing the `/v1/message/{id}` endpoint. It is capable of dealing with the defualt http errors thanks to the module [error-handler-module](https://www.npmjs.com/package/error-handler-module) (e.g. 404 NOT_FOUND_ERROR).

### __routes.api.v2__
The api v2 sub-component in charge of exposing the `/v2/message/{id}` endpoint. It is capable of dealing with the defualt http errors thanks to the module [error-handler-module](https://www.npmjs.com/package/error-handler-module) (e.g. 404 NOT_FOUND_ERROR).

### __controller__
Is the orchestrator of the different components and subcomponents of the system, handles the core logic of the Hexagon Architecture.

### __controller.api.v1__
Implements the v1 business logic needed to manage the api v1 routes requests. It retrieves a given message from the store and manipulates its payload in order to give back to the api v1 request a response containing:
- `id`: original message id.
- `text`: lowercase original message text.

### __controller.api.v2__
Implements the v2 business logic needed to manage the api v2 routes requests. It retrieves a given message from the store and manipulates its payload in order to give back to the api v2 request a response containing:
- `id`: original message id.
- `text`: uppercase original message text.
- `receptionTimestamp`: ISO string timestamp of the original message reception time.

### __controller.bus__
Implements the business logic needed to manage the messages coming from the rabbitmq bus. It is in charge of storing the original payload messages along with the reception timestamp into the monogodb store.

### __store__
Manages the connection with the mongodb database exposing storing and retrieving functionalities of messages which in turn will be exploited by the controllers.


# CONFIG

The configuration is scattered across different files and mixed according to the service run mode as said above.
The intesting bit is the fact that is stored in js objects and is definable per-component and per-sub-component. 

E.g. __routes__ and __routes.admin__ [default configuration](config/default.js):
```js
{
    routes: {
		admin: {
			swaggerValidator: {
				apiDocEndpoint: '/__/docs/api',
				validateRequests: true,
				validateResponses: true,
				validationEndpoint: '/test',
				format: 'yaml',
				yaml: {
					file: './docs/syncapi.yaml',
				},
			},
		},
    },
}
```

Note that the configuration varies according to the different run modes. Particularly the rabbitmq one for the systemic-rabbitmq component coming as an npm library:
- __Default__: according the the business logic of our service the default config is needed only for the service to be subscribed to a given queue.
- __Test__: in order to test the service business logic during the test phase is the very same service the one publishing the messages that is going to consume. More info in the test section.


# DOCS
The _/docs_ folder holds the synchronous api documentation for the endpoints exposed by the __routes__ component.
As defined in the above section the [_syncapi.yaml_](docs/syncapi.yaml) is used by the [swagger-endpoint-validator](https://www.npmjs.com/package/swagger-endpoint-validator) in order to:
- validate the requests and responses.
- expose the swagger api documentation at the `/__/docs/api` endpoint.


# DOCKER
- [Dokcerfile](Dokcerfile): the service is dockerized and ready to be shipped thanks to the Dockerfile.
- [docker-compose.yml](docker-compose.yml): the service comes with a docker compose file in order to manage the infrastructure needed by the service to be up and running (i.e. rabbitmq - mongodb)

# MAKE
The service comes whit an easy and lean makefile that can be used as a base for any CI/CD tool that need to manage the service.

# START
Starting the service means to start the system components and sub-components in the proper order. Something that the [index.js](index.js) and the [system.js](system.js) files are taking care of. In order for the service to be up and running the related infrstructure must be in place


```
npm run infra-up
npm run start
```

# TEST
The service comes with a simple tests framework already in place in the _/test_ folder.

There is one test in charge of checking the whole integration chain that is almost and end to end test and does the following:
1. publishes a message into the very same rabbitmq queue that the service itself is subscribed to.
2. waits for the message to be received by the service and stored into the mongodb database.
3. calls the `/v1/message/{id}` endpoint and checks the correctness of the response.
3. calls the `/v2/message/{id}` endpoint and checks the correctness of the response.

```
npm run test
```

### note about a nasty hack
The rabbitmq docker container can be up thanks to docker compose but is not actually running until 20 seconds after it started, that is where the npm `sleep` script comes in handy.