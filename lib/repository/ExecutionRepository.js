var simpleRestful = require("simple-restful");
var restify = require("restify");

var BaseRepository = simpleRestful.getDefaultRepository("InMemory");

var Repository = function(dataInfo, repositoryOptions) {
    BaseRepository.call(this, dataInfo, repositoryOptions);
};

Repository.prototype = Object.create(BaseRepository.prototype);

Repository.prototype.add = function(execution, callback, additionalIdentifiers) {
    execution.state = "pending";
    execution.id = this._generateId();
    BaseRepository.prototype.add.call(this, execution, callback, additionalIdentifiers);

    var apiInfoRepository = this.linkedRepositories["apiInfo"];
    var self = this;
    apiInfoRepository.get(null, function(apiInfo) {
        self._call(apiInfo.url, execution.path, execution.verb, execution.parameters, null, function(err, obj) {
            //TODO : update repository (works for memory)
            execution.state = "finished";
            if(err) {
                execution.success = false;
                execution.result = err;
            } else {
                execution.success = true;
                execution.result = obj;
            }
        });
        //TODO
        var completeUrl = apiInfo.url + path;
        execution.url = completeUrl;
    });
};

Repository.prototype._call = function(url, path, method, body, headers, callback) {
    var restClient = restify.createJsonClient({url: url});

    switch(method) {
        case "get":
            restClient.get(path, handleResponse);
            break;
        case "post":
            restClient.post(path, body, handleResponse);
            break;
        case "put":
            restClient.put(path, body, handleResponse);
            break;
        case "delete":
            restClient.del(path, handleResponse);
            break;
        default:
            throw "method " + method + "not implemented";
            break;
    }

    function handleResponse(err, req, res, data) {
        callback(err, data);
        restClient.close();
    }
};

//TODO timestamp, not milliseconds
Repository.prototype._generateId = function() {
    var timestamp = new Date().getUTCMilliseconds();
    return timestamp;
};

module.exports = Repository;