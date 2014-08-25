'use strict';

angular.module(APP_NAME_CONTROLLERS).controller('ExplorerController', [
    '$scope', 'ApiInfo', "Resources", "WaitingService", "AlertService", "ExplorerService",
	function($scope, ApiInfo, Resources, WaitingService, AlertService, ExplorerService) {
		//init
        var waitingService = new WaitingService();
        var alertService = new AlertService($scope.$parent);

        $scope.isResourceCollapsed = [];
        $scope.isMethodCollapsed = [];
		$scope.apiInfo = ApiInfo.get();
        $scope.resources = Resources.query(handleResources);

        $scope.callMethod = function(method) {
            var execution = {
                apiInfo: $scope.apiInfo,
                method: method
            };
            waitingService.start();
            ExplorerService.execute(execution, function (result) {
                $scope.result = result;
                waitingService.stop();
            });
            $scope.lastMethod = method;
        };

        $scope.getLabelForMethod = function(method) {
            var labels = {
                get: "info",
                post: "success",
                "delete": "danger",
                "put": "warning"
            };
            return labels[method];
        };

        $scope.hasExampleValue = function(parameters) {
            return ExplorerService.hasExampleValue(parameters);
        };

        $scope.useExampleValues = function(parameters) {
            ExplorerService.replaceExampleValues(parameters);
        };

        function handleResources(resources) {
            for(var i=0; i<resources.length; i++) {
                $scope.isResourceCollapsed[i] = true;
                $scope.isMethodCollapsed[i] = [];
                var methods = resources[i].methods;
                for(var j=0; j<methods.length; j++) {
                    $scope.isMethodCollapsed[i][j] = true;

                    useFirstEnumIfRequired(methods[j].parameters);
                }
            }
        }

        function useFirstEnumIfRequired(parameters) {
            if(parameters) {
                for (var i = 0; i < parameters.length; i++) {
                    if(parameters[i].type == "enum" && parameters[i].required) {
                        parameters[i].value = parameters[i].values[0];
                    }
                }
            }
        }
	}]);