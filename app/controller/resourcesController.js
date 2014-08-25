exports.get = function(resources) {
    return function(req, res) {
        res.send(resources);
    };
};