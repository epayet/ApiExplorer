var simpleRestful = require("simple-restful");
var ExecutionRepository = require("./repository/ExecutionRepository");

var ExplorerServer = function(options) {
    this.server = simpleRestful.createServer({port: options.port, debug: true});
    this.apiDescription = options.apiDescription;
    this.server.registerRepository("Execution", ExecutionRepository);
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
    this.server.addResource({
        name: "execution",
        idField: "id",
        repository: this.server.getRepository("Execution"),
        linkedResources: [{"name": "apiInfo"}]
    });
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