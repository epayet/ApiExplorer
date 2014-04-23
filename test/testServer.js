var restify = require("restify");
var ExplorerServer = require("../lib/ExplorerServer");

var client, server;
var apiDescription = getApiDescription();
var testExecutions = getTestData("execution");
var testResults = getTestData("result");

module.exports = {
    setUp : function(callback) {
        client = restify.createJSONClient({url: "http://localhost:8081"});
        server = new ExplorerServer({port: 8081, apiDescription: apiDescription});
        server.run();
        callback();
    },

    tearDown: function(callback) {
        client.close();
        server.close();
        callback();
    },

    getApiInfo: function(assert) {
        client.get("/apiInfo", function(err, req, res, obj) {
            assert.same(apiDescription.apiInfo, obj);
            assert.done();
        });
    },

    getResources: function(assert) {
        client.get("/resource", function(err, req, res, obj) {
            assert.same(apiDescription.resource, obj);
            assert.done();
        });
    },

    createSimpleExecution_NoParameters: function(assert) {
        client.post("/execution", testExecutions[0], function(err, req, res, savedExecution) {
            checkAndAssertExecution(savedExecution, assert, testResults[0], function(finishedExecution) {
                assert.equals(finishedExecution.url, "http://localhost:8081/apiInfo");
                assert.done();
            });
        });
    },

    createExecution_WithParametersAndGetMethod: function(assert) {
        client.post("/execution", testExecutions[1], function(err, req, res, savedExecution) {
            checkAndAssertExecution(savedExecution, assert, testResults[0], function(finishedExecution) {
                assert.equals(finishedExecution.url, "http://localhost:8081/apiInfo?testQuery=1");
                assert.done();
            });
        });
    },

    createExecution_WithPutMethodAndMixQueryBodyParameters: function(assert) {
        client.post("/execution", testExecutions[2], function(err, req, res, savedExecution) {
            checkExecution(savedExecution, function(finishedExecution) {
                assert.equals(finishedExecution.url, "http://localhost:8081/test?testQuery=1");
                assert.same(finishedExecution.body, {testBody: 2});
                assert.done();
            });
        })
    },

    createExecution_ParameterType_id: function(assert) {
        client.post("/execution", testExecutions[3], function(err, req, res, savedExecution) {
            checkExecution(savedExecution, function(finishedExecution) {
                assert.equals(finishedExecution.url, "http://localhost:8081/test/2?testQuery=1");
                assert.done();
            });
        })
    }
};

function checkAndAssertExecution(savedExecution, assert, testResult, callback) {
    checkExecution(savedExecution, function(execution) {
        assert.ok(execution.state && execution.state == "finished");
        assert.ok(execution && execution.success, "Execution failed, reason : " + execution ? execution.message : "No reason");
        assert.same(execution.result, testResult);
        if(!callback)
            assert.done();
        else
            callback(execution);
    });
}

function checkExecution(execution, callback) {
    client.get("/execution/" + execution.id, function(err, req, res, receivedExecution) {
        if(receivedExecution.state == "pending") {
            setTimeout(function() {
                checkExecution(execution, callback);
            }, 200);
        } else
            callback(receivedExecution);
    });
}

function getApiDescription() {
    return {
        apiInfo:  {
            "title": "An example api",
            "description": "the description",
            "url": "http://localhost:8081"
        },
        resource: [
            {
                "name": "ApiInfo",
                "methods": [
                    {
                        "verb": "get",
                        "path": "/apiInfo",
                        "description": "get the apiInfo",
                        "parameters" : [{
                                "name": "testQuery",
                                "description": "this is a parameter",
                                "required": true,
                                "parameterType": "query"
                            }
                        ]
                    }
                ]
            }, {
                "name": "test",
                "methods": [{
                    "verb": "put",
                    "path": "/test",
                    "parameters": [{
                        "name": "testQuery",
                        "parameterType": "query"
                    }, {
                        "name": "testBody",
                        "parameterType": "body"
                    }]
                },{
                    "verb": "get",
                    "path": "/test/{id}",
                    "parameters": [{
                        "name": "testQuery",
                        "parameterType": "query"
                    }, {
                        "name": "testId",
                        "parameterType": "id"
                    }]
                }]
            }
        ]
    };
}

function getTestData(data) {
    switch(data) {
        case "execution":
            return [{
                resource: "ApiInfo",
                verb: "get",
                path: "/apiInfo"
            }, {
                resource: "ApiInfo",
                verb: "get",
                path: "/apiInfo",
                parameters: {
                    "testQuery": 1
                }
            }, {
                resource: "test",
                verb: "put",
                path: "/test",
                parameters: {
                    "testQuery": 1,
                    "testBody": 2
                }
            }, {
                resource: "test",
                verb: "get",
                path: "/test/{id}",
                parameters: {
                    "testQuery": 1,
                    "testId": 2
                }
            }];

        case "result":
            return [apiDescription.apiInfo]
    }
}