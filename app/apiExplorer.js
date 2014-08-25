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

    app.use("/", this.getRouter());

    app.listen(app.get('port'), function() {
        console.log('Express server listening at http://localhost:' + app.get('port'));
    });
};

ApiExplorer.prototype.getRouter = function() {
    var router = express.Router();
    router.get("/api/apiInfo", apiInfoController.get(this.apiDescription.apiInfo));
    router.get("/api/resources", resourcesController.get(this.apiDescription.resources));
    router.use("/", express.static(path.join(__dirname, '../client/public')));
    return router;
};

module.exports = ApiExplorer;