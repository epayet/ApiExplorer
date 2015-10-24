var _ = require('underscore');

exports.get = function(resources) {
    return function(req, res) {
        res.send(resources);
    };
};

exports.getResource = function(resources) {
    return function(req, res) {
        var resource = _.find(resources, function (resource) {
            return resource.name == req.params.name;
        });
        res.send(resource);
    };
};