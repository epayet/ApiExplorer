'use strict';

angular.module(APP_NAME_SERVICES).factory('WaitingService', ['$modal',
    function($modal) {
        var WaitingService = function() {

        };

        WaitingService.prototype.start = function(message) {
            var self = this;
            if(!message) message = "Processing";
            this.modalInstance = $modal.open({
                templateUrl: 'templates/modal-waiting.html',
                controller : function($scope) {
                    self.scope = $scope;
                    $scope.message = message;
                    $scope.closeModal = function() {
                        $scope.$close();
                    }
                }
            });
        };

        WaitingService.prototype.setMessage = function(message) {
            if(this.scope)
                this.scope.message = message;
        };

        WaitingService.prototype.stop = function() {
            var self = this;
            try {
                this.modalInstance.close();
            } catch(e) {
//                console.log("crash"); #lol
                setTimeout(function () {
                    self.modalInstance.close();
                }, 1000);
            } finally {
                this.scope = null;
            }
        };

        return WaitingService;
    }]);