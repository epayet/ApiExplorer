'use strict';

angular.module(APP_NAME_SERVICES).factory('Resources', ['ResourceFactory', 'ExplorerService',
    function(ResourceFactory, ExplorerService) {
        var resourcesInfo = {
            name : "resources",
            idField: "name",
            apiUrl : ExplorerService.getApiUrl()
        };
        return ResourceFactory.createResource(resourcesInfo);
    }]);