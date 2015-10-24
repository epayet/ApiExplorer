'use strict';

angular.module(APP_NAME_SERVICES).factory('ApiInfo', ['ResourceFactory', 'ExplorerService',
	function(ResourceFactory, ExplorerService) {
		var resourcesInfo = {
			name : "apiInfo",
			apiUrl : ExplorerService.getApiUrl()
		};
		return ResourceFactory.createResource(resourcesInfo);
	}]);