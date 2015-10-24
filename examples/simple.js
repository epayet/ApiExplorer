var ApiExplorer = require("api-explorer");

var apiExplorer = new ApiExplorer(getApiDescription());
apiExplorer.startServer({port: 8082});

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