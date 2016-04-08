/**
 * http://usejsdoc.org/
 */

var pm = angular.module('pm', [ 'ui.router' ]);

pm.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home-state', {
		url : '/',
		templateUrl : 'templates/pm-home.html'
	}).state('all-state', {
		url : '/view-all',
		templateUrl : 'templates/pm-grid.html',
		controller : 'ViewAllController'
	}).state('new-state', {
		url : '/add-new',
		templateUrl : 'templates/pm-product-form.html',
		controller : 'AddNewController'
	}).state('all-state.edit-state', {
		url : '/edit/:prodId',
		views : {
			"read-view" : {
				templateUrl : 'templates/pm-product-view.html',
				controller : 'ViewAndUpdateController'
			},
			"edit-view" : {
				templateUrl : 'templates/pm-product-form.html',
				controller : 'ViewAndUpdateController'
			}
		}

	}).state('all-state.view-state', {
		url : '/view/:prodId',
		views : {
			"read-view" : {
				templateUrl : 'templates/pm-product-view.html',
				controller : 'ViewAndUpdateController'
			}
		}
	});

});

pm.controller('ViewAllController', function($scope, pmService, $state) {

	pmService.loadAll().then(function(items) {
		$scope.products = items;
	});

	$scope.remove = function(prodId) {
		pmService.remove(prodId).then(function(value) {
			$state.reload();
		});
	};

});

pm.controller('ViewAndUpdateController', function($scope, pmService, $location,
		$stateParams) {

	if ($stateParams.prodId) {
		pmService.loadById($stateParams.prodId).then(function(item) {
			$scope.product = item;
		});
	}

	$scope.save = function() {
		pmService.update($scope.product).then(function(value) {
			$scope.product = {};
			console.log('New product updated...');
			$location.path('view-all');
		});
	}

});

pm.controller('AddNewController', function($scope, pmService, $location) {
	$scope.product = {};
	$scope.save = function() {
		pmService.save($scope.product).then(function(value) {
			$scope.product = {};
			console.log('New product saved...');
			$location.path('view-all');
		});
	};
});

pm.factory('pmService', function($http, $q) {
	var url = "http://localhost:3000/api/products";
	var service = {
		loadAll : function() {
			var defer = $q.defer();
			$http.get(url).then(function(resp) {
				defer.resolve(resp.data);
			}, function(reason) {
				defer.reject(reason);
			});
			return defer.promise;
		},
		loadById : function(prodId) {
			var defer = $q.defer();
			$http['get'](url + '/' + prodId).then(function(resp) {
				defer.resolve(resp.data);
			}, function(reason) {
				defer.reject(reason);
			});
			return defer.promise;
		},
		save : function(newProduct) {
			var defer = $q.defer();
			newProduct.make = Date.now();
			$http.post(url, newProduct).then(function(resp) {
				defer.resolve(resp.data);
			}, function(reason) {
				defer.reject(reason);
			});
			return defer.promise;
		},
		update : function(newProduct) {
			var defer = $q.defer();
			newProduct.make = Date.now();
			$http.put(url+"/"+newProduct._id, newProduct).then(function(resp) {
				defer.resolve(resp.data);
			}, function(reason) {
				defer.reject(reason);
			});
			return defer.promise;
		},
		remove : function(prodId) {
			var defer = $q.defer();
			$http['delete'](url + '/' + prodId).then(function(resp) {
				defer.resolve(resp.data);
			}, function(reason) {
				defer.reject(reason);
			});
			return defer.promise;
		}

	};
	return service;

});