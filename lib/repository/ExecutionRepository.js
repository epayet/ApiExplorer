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
    var resourcesRepository = this.linkedRepositories["resource"];
    var self = this;
    apiInfoRepository.get(null, function(apiInfo) {
        resourcesRepository.get(execution.resource, function(resource) {
            var parametersDefinition = getParametersDefinition(resource, execution.verb, execution.path);
            var path = getPath(execution.parameters, execution.path, parametersDefinition);
            self._call(apiInfo.url, path, execution.verb, execution.parameters, parametersDefinition, null, function(err, obj, body) {
                execution.state = "finished";
                execution.body = body;
                if(err) {
                    execution.success = false;
                    execution.result = err;
                } else {
                    execution.success = true;
                    execution.result = obj;
                }
            });

            var completeUrl = apiInfo.url + path;
            execution.url = completeUrl;
        });
    });
};

Repository.prototype._call = function(url, path, method, parameters, parametersDefinition, headers, callback) {
    var restClient = restify.createJsonClient({url: url});
    var body = createBody();

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

    function createBody() {
        var body = undefined;
        for(var key in parameters) {
            if(isParameterType(key, "body", parametersDefinition)) {
                if(body === undefined)
                    body = {};
                body[key] = parameters[key];
            }
        }
        return body;
    }

    function handleResponse(err, req, res, data) {
        callback(err, data, body);
        restClient.close();
    }
};

//TODO timestamp, not milliseconds
Repository.prototype._generateId = function() {
    var timestamp = new Date().getUTCMilliseconds();
    return timestamp;
};

function getPath(parameters, path, parametersDefinition) {
    var queryParametersAdded = 0;
    for(var key in parameters) {
        if(parameters[key] !== "") {
            if (isParameterType(key, "query", parametersDefinition)) {
                path = addQueryParameter(path, key, parameters[key], queryParametersAdded);
                queryParametersAdded++;
            } else if (isParameterType(key, "id", parametersDefinition)) {
                path = path.replace("{" + key + "}", parameters[key]);
            }
        }
    }
    return path;

    function addQueryParameter(path, varName, varValue, parametersAdded) {
        var charAdd = "&";
        if(parametersAdded === 0)
            charAdd = "?";
        return path + charAdd + varName + "=" + varValue;
    }
}

function getParametersDefinition(resource, verb, path) {
    for(var i=0; i<resource.methods.length; i++) {
        if(resource.methods[i].verb == verb && resource.methods[i].path == path) {
            return resource.methods[i].parameters;
        }
    }
}

function isParameterType(varName, parameterType, parametersDefinition) {
    for(var i=0; i<parametersDefinition.length; i++) {
        if(parametersDefinition[i].name == varName) {
            if(parametersDefinition[i].parameterType == parameterType)
                return true;
            else
                return false;
        }
    }
    return false;
}

module.exports = Repository;