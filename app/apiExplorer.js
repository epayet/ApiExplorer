var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");

var apiInfoController = require("./controller/apiInfoController");
var resourcesController = require("./controller/resourcesController");

function ApiExplorer(apiDescription) {
    this.apiDescription = apiDescription;
}

ApiExplorer.prototype.startServer = function(options) {
    var app = express();
    app.set('port', process.env.PORT || options.port ? options.port : 8080);
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api/explorer", this.getApiRouter());
    app.use("/", this.getClientRouter());

    app.listen(app.get('port'), function() {
        console.log('Express server listening at http://localhost:' + app.get('port'));
    });
};

ApiExplorer.prototype.getApiRouter = function() {
    var router = express.Router();
    router.get("/apiInfo", apiInfoController.get(this.apiDescription.apiInfo));
    router.get("/resources", resourcesController.get(this.apiDescription.resources));
    return router;
};

ApiExplorer.prototype.getClientRouter = function() {
    return express.static(path.join(__dirname, '../client/public'));
};

module.exports = ApiExplorer;