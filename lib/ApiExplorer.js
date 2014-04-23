var ExplorerServer = require("./explorer/ExplorerServer");
var fork = require('child_process').fork;

function createExplorer(options) {
    var server = new ExplorerServer({port: 8093, apiDescription: options.apiDescription});
    server.run();

    var clientChild = fork(__dirname + "/../client/scripts/web-server.js", [options.clientPort]);
    console.log("Explorer running at http://localhost:" + options.clientPort + "/node_modules/api-explorer/client/app/index.html");
}

exports.createExplorer = createExplorer;