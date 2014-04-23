var ExplorerServer = require("./explorer/ExplorerServer");
var fork = require('child_process').fork;

function createExplorer(options) {
    var server = new ExplorerServer({port: options.serverPort, apiDescription: options.apiDescription});
    server.run();

    var clientChild = fork("./client/scripts/web-server.js", [options.clientPort]);
    console.log("Explorer running at http://localhost:" + options.clientPort + "/client/app/index.html");
}

exports.createExplorer = createExplorer;