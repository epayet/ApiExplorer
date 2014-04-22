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
                                "required": true,
                                type: "query"
                            }, {
                                "name": "someParameter2",
                                "description": "this is another parameter",
                                "required": false
                            }
                        ],
                        "result": [{
                            "name": "title",
                            "type": "string",
                            "description": "The title of the api"
                        }, {
                            "name": "description",
                            "type": "string",
                            "description": "The description of the api"
                        }, {
                            "name": "url",
                            "type": "string",
                            "description": "The url of the api"
                        }]
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
            }, {
                "name": "Execution",
                "methods": [
                    {
                        "verb": "get",
                        "path": "/execution",
                        "description": "Get all the executions"
                    }, {
                        "verb": "post",
                        "path": "/execution",
                        "description": "Create an execution",
                        "parameters": [{
                            "name": "verb",
                            "description": "The verb to use (get, post, ...)",
                            "required": true
                        }, {
                            "name": "path",
                            "description": "The path",
                            "required": true
                        }, {
                            "name": "parameters",
                            "description": "The parameters",
                            "required": false
                        }]
                    }
                ]
            }
        ]
    };
}