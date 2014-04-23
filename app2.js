var apiExplorer = require("./lib/ApiExplorer");

apiExplorer.createExplorer({clientPort: 8082, apiDescription: getApiDescription()});

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
                                parameterType: "query"
                            }, {
                                "name": "someParameter2",
                                "description": "this is another parameter",
                                "required": false,
                                parameterType: "query"
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
                            "required": true,
                            parameterType: "body"
                        }, {
                            "name": "path",
                            "description": "The path",
                            "required": true,
                            parameterType: "body"
                        }, {
                            "name": "parameters",
                            "description": "The parameters",
                            "required": false,
                            parameterType: "body"
                        }]
                    }
                ]
            }
        ]
    };
}