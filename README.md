# API Explorer

This module generates a web documentation for your RESTful API. You write your documentation in JSON, and it generates a fully live testable and dynamic web page. A really simple example can be found [here](https://blooming-oasis-8128.herokuapp.com/).

## Get Started

### Installation

    npm install api-explorer

### Add data to the explorer

```javascript
var ApiExplorer = require("api-explorer");
var apiExplorer = new ApiExplorer(getApiDescription()); //see json examples later
apiExplorer.startServer({port: 8082});
```

### Simple Example

The apiDescription object needs two information: apiInfo and resources. Here a simple example with one resource and one route:

```javascript
function getApiDescription() {
    return {
        apiInfo: {
            "title": "The Example API",
            "description": "the description bla bla bla",
            "url": "http://localhost:8080"
        },
        resources: [{
            "name": "Example",
            "description": "This resource represents an example resource",
            "methods": [{
                "verb": "get",
                "path": "/example/{name}",
                "description": "Retrieve one example resource by name",
                "parameters": [{
                    "name": "name",
                    "description": "The name of the resource",
                    "parameterType": "id",
                    "required": true,
                    "exampleValue": "someExistingResource"
                }],
                "result": [{
                    "name": "name",
                    "description": "The name of the resource",
                    "type": "string"
                }]
            }]
        }]
    };
}
```

This description means that you have one resource, which the name is "Example".
This resource has one route and you can access it like this: `GET http://localhost:8080/example/{name}`.
The result will be something like {"name": "someName"}.
You can find above more details the fields.

Checkout more examples in the [examples](examples) folder. One is the example above, and the other is a more complex/complete one from one of my previous work.

## Documentation

### API Info

TODO

### Resource

TODO

## Contributing

The API Explorer is an API itself and generates an angularJS application.
