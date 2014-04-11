var simpleRestful = require("simple-restful");

var ExplorerServer = function(options) {
    this.server = simpleRestful.createServer({port: options.port, debug: true});
    this.apiDescription = options.apiDescription;
    this._createResources();
};

ExplorerServer.prototype.run = function() {
    this.server.run();
};

ExplorerServer.prototype.close = function() {
    this.server.close();
};

ExplorerServer.prototype._createResources = function() {
    this._addResource("apiInfo", this.apiDescription.apiInfo);
    this._addResource("resource", this.apiDescription.resource);
};

ExplorerServer.prototype._addResource = function(name, defaultData) {
    var repository = simpleRestful.getDefaultRepository("InMemory");
    this.server.addResource({
        name: name,
        repository: repository,
        repositoryOptions: {
            defaultData: [defaultData]
        }
    });
};

module.exports = ExplorerServer;