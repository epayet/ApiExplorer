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
    var InMemoryRepository = simpleRestful.getDefaultRepository("InMemory");

    this.server.addResource({
        name: "apiInfo",
        repository: InMemoryRepository,
        repositoryOptions: {
            defaultData: [this.apiDescription.apiInfo]
        }
    });

    this.server.addResource({
        name: "resource",
        idField: "name",
        repository: InMemoryRepository,
        repositoryOptions: {
            defaultData: this.apiDescription.resource
        }
    });

    this.server.addResource({
        name: "execution",
        idField: "id",
        repository: this.server.getRepository("Execution"),
        linkedResources: [{"name": "apiInfo"}, {"name": "resource"}]
    });
};

module.exports = ExplorerServer;