# <%= name %>

<%= description %>

# COMPONENTS
- __app__
- __express__
- __config__
- __routes__
    - __routes.admin__
    - __routes.api.v1__
    - __routes.api.v2__
- __controller__
    - __controller.api__
        - __controller.api.v1__
        - __controller.api.v2__
    - __controller.bus__
- __bus__
- __store__

# START
`npm run start`

# TEST
`npm run test`

# INFRASTRUCTURE
- __mongo__: store
- __rabbitmq__: message bus
