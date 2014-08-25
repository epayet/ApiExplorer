'use strict';

var APP_NAME = "apiExplorer";
var APP_NAME_CONTROLLERS = APP_NAME + ".controllers";
var APP_NAME_SERVICES = APP_NAME + ".services";
var APP_NAME_FILTERS = APP_NAME + ".filters";
var APP_NAME_DIRECTIVES = APP_NAME + ".directives";

// Declare app level module which depends on filters, and services
angular.module(APP_NAME, [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  APP_NAME_FILTERS,
  APP_NAME_SERVICES,
  APP_NAME_DIRECTIVES,
  APP_NAME_CONTROLLERS
]).

constant('Constants', {
    //locale mode : 
    //apiUrl: 'api/',
    //remote mode : 
    apiUrl: '/api/explorer/'
}).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/explorer', {templateUrl: 'partials/explorer.html', controller: 'ExplorerController'});
  $routeProvider.otherwise({redirectTo: '/explorer'});
}]);

//Modules declarations
angular.module(APP_NAME_CONTROLLERS, []);
angular.module(APP_NAME_SERVICES, []);
angular.module(APP_NAME_FILTERS, []);
angular.module(APP_NAME_DIRECTIVES, []);