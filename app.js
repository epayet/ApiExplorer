var ExplorerServer = require("./lib/ExplorerServer");

var apiDescription = getApiDescription();
server = new ExplorerServer({port: 8080, apiDescription: apiDescription});
server.run();

function getApiDescription() {
    return {
        apiInfo: {
            "title": "The Explorer API",
            "description": "the description bla bla bla",
            "url": "http://localhost:8080"
        },
        resource: [
            {
                "name": "ApiInfo",
                "methods": [
                    {
                        "verb": "get",
                        "path": "/apiInfo",
                        "description": "get the apiInfo",
                        "parameters" : [
                            {
                                "name": "someParameter",
                                "description": "this is a parameter",
                                "required": true
                            }, {
                                "name": "someParameter2",
                                "description": "this is another parameter",
                                "required": false
                            }
                        ]
                    }
                ]
            }, {
                "name": "Resources",
                "methods": [
                    {
                        "verb": "get",
                        "path": "/resource",
                        "description": "Get the resources"
                    }
                ]
            }
        ]
    };
}