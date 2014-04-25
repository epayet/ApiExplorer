# API Explorer

This module let you build a nice interactive documentation for your RESTful API only with json data.
You can see the references of your resources, but you can also try to call them with examples with an easy form.
So it's a documentation and an easy way to discover the API by testing it easily.

## Get Started

### Installation

    npm install api-explorer

### Add data to the explorer

    var apiExplorer = require("api-explorer");
    apiExplorer.createExplorer({clientPort: 8082, apiDescription: getApiDescription()});

* clientPort: the port where the html client will be available (checkout the console to have the url)
* apiDescription: json object containing the information of the api.

#### Example

The apiDescription object needs two information: apiInfo and resource. Here a simple example with one resource and one route:

    function getApiDescription() {
        return {
            apiInfo: {
                "title": "The Example API",
                "description": "the description bla bla bla",
                "url": "http://localhost:8080"
            },
            resource: [{
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

This description means that you have one resource, which the name is "Example".
This resource has one route and you can access it like this: `GET http://localhost:8080/example/{name}`.
The result will be something like {"name": "someName"}.
You can find above more details the fields.

TODO screen

#### API Info

TODO

#### Resource

TODO