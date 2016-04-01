/**
 * http://usejsdoc.org/
 */

(function() {

	var app = angular.module('todo', [ 'ngRoute', 'ngResource' ]);
	
	//-------------------------------------------------

	app.config(function($routeProvider) {

		var routeConfig = {
			templateUrl : "todomvc-index.html",
			controller : "TodoController"
		};

		$routeProvider
		.when('/', routeConfig)
		.when('/:status', routeConfig)
		.otherwise({redirectTo:'/'});

	});

	
	//---------------------------------------------------
	
	
	
	
	
})();