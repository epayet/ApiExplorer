var restify = require("restify");
var ExplorerServer = require("../lib/ExplorerServer");

var client, server;
var apiDescription = getApiDescription();

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
    }
};

function getApiDescription() {
    return {
        apiInfo: {
            "title": "An example api",
            "description": "the description",
            "url": "the url"
        },
        resource: [
            {

            }
        ]
    };
}