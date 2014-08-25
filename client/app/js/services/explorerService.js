angular.module(APP_NAME_SERVICES).factory("ExplorerService", ['$http',
    function ($http) {
        return {
            hasExampleValue: function(parameters) {
                if(!parameters) return false;

                for(var i=0; i<parameters.length; i++) {
                    if(parameters[i].exampleValue)
                        return true;
                }
                return false;
            },

            replaceExampleValues: function(parameters) {
                if(parameters) {
                    for(var i=0; i<parameters.length; i++) {
                        if(parameters[i].type == "object")
                            parameters[i].stringValue = angular.toJson(parameters[i].exampleValue);
                        else
                            parameters[i].value = parameters[i].exampleValue;
                    }
                }
            },

            execute: function(info, callback) {
                var url = info.apiInfo.url + info.method.path;
                url = getPath(info.method.parameters, url);

                var body = createBody();
                var verbFunction = $http[info.method.verb];
                switch(info.method.verb) {
                    case "get":
                        verbFunction(url).success(handleResponse).error(handleResponse);
                        break;
                    case "post":
                        verbFunction(url, body).success(handleResponse).error(handleResponse);
                        break;
                    case "put":
                        verbFunction(url, body).success(handleResponse).error(handleResponse);
                        break;
                    case "delete":
                        verbFunction(url).success(handleResponse).error(handleResponse);
                        break;
                }

                function handleResponse (data, status, headers, config) {
                    callback({url: url, result: data.data ? data.data : data, body: body});
                }

                function createBody() {
                    var body = undefined;
                    var parameters = info.method.parameters;
                    if(parameters) {
                        for (var i = 0; i < parameters.length; i++) {
                            if (parameters[i].parameterType == "body" && parameters[i].value !== undefined) {
                                if (body === undefined)
                                    body = {};
                                body[parameters[i].name] = parameters[i].value;
                            }
                        }
                    }
                    return body;
                }
            }
        };

        function getPath(parameters, path) {
            var queryParametersAdded = 0;
            if(parameters) {
                for (var i = 0; i < parameters.length; i++) {
                    if (parameters[i].value !== undefined) {
                        if (parameters[i].parameterType == "query") {
                            path = addQueryParameter(path, parameters[i].name, parameters[i].value, queryParametersAdded);
                            queryParametersAdded++;
                        } else if (parameters[i].parameterType == "id") {
                            path = path.replace("{" + parameters[i].name + "}", parameters[i].value);
                        }
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
    }
]);