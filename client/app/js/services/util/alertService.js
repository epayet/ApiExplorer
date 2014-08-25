'use strict';

angular.module(APP_NAME_SERVICES).factory('AlertService', ["$timeout",
    function($timeout) {
        var AlertService = function(scope, scopeCloseDelay) {
            this.scope = scope;
            this.scopeCloseDelay = scopeCloseDelay ? scopeCloseDelay : 8000;
            this.initializeScope();
        };

        AlertService.prototype.add = function(msg, type) {
            var scope = this.scope;
            if(!type)
                type = "danger";
            scope.alerts.push({type:type, "message":msg});
            $timeout(function() {
                scope.closeAlert(scope.alerts.length - 1);
            }, this.scopeCloseDelay);
        };

        AlertService.prototype.initializeScope = function() {
            var scope = this.scope;
            if(scope.alerts == null)
                scope.alerts = [];

            if(scope.closeAlert == null) {
                scope.closeAlert = function(index) {
                    scope.alerts.splice(index, 1);
                };
            }
        };

        return AlertService;
    }]);