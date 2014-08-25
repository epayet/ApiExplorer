'use strict';

angular.module(APP_NAME_SERVICES).factory('ApiInfo', ['ResourceFactory', 'Constants',
	function(ResourceFactory, Constants) {
		var resourcesInfo = {
			name : "apiInfo",
			apiUrl : Constants.apiUrl
		};
		return ResourceFactory.createResource(resourcesInfo);
	}]);