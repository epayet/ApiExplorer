"use strict";

angular.module(APP_NAME_CONTROLLERS).controller('IndexController', ['$scope', '$location',
    function($scope, $location) {
        $scope.isActive = function(route) {
            return route === $location.path();
        }
    }]);