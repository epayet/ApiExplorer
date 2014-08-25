exports.get = function(apiInfo) {
    return function(req, res) {
        res.send(apiInfo);
    };
};