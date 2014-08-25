'use strict';

angular.module(APP_NAME_SERVICES).factory('Resources', ['ResourceFactory', 'Constants',
    function(ResourceFactory, Constants) {
        var resourcesInfo = {
            name : "resources",
            idField: "name",
            apiUrl : Constants.apiUrl
        };
        return ResourceFactory.createResource(resourcesInfo);
    }]);