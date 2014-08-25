var ApiExplorer = require("./app/ApiExplorer");

var apiExplorer = new ApiExplorer(getApiDescription());
apiExplorer.startServer({port: 8082});

function getApiDescription() {
    return {
        apiInfo: {
            "title": "The Explorer API",
            "description": "the description bla bla bla",
            "url": "http://localhost:8082/api/explorer"
        },
        resources: [
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
                        "path": "/resources",
                        "description": "Get the resources"
                    }
                ]
            }
        ]
    };
}