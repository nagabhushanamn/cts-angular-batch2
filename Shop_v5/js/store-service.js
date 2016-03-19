/**
 * http://usejsdoc.org/
 */

var module = angular.module('store-service', []);

module.factory('storeService', function($q, $http) {
	var service = {
		loadProducts : function() {

			var defer = $q.defer();

			var url = "http://localhost:3000/api/products";
			var promise = $http.get(url);
			promise.then(function(response) {
				// .....
				defer.resolve(response.data);
			});

			return defer.promise;
		}
	};
	return service;
});
