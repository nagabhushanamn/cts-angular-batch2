/**
 * http://usejsdoc.org/
 */

var storeModule = angular.module('store', []);

storeModule.factory('storeService', function($q,$http) {
	var service = {
		loadProducts : function() {
			
			var defer = $q.defer();
			
			var url="http://localhost:3000/api/products";
			var promise=$http.get(url);
			promise.then(function(response) {
				//.....
				defer.resolve(response.data);
			});
			
			return defer.promise;
		}
	};
	return service;
});

// Controller(s)
storeModule.controller('StoreController', function($scope, $filter,storeService) {
	var promise = storeService.loadProducts();
	promise.then(function(items) {
		$scope.products=items;
	}, function(reason) {
		$scope.messsage=reason;
	}, function(progress) {
		$scope.message=progress;
	});
	//......
});

storeModule.controller('TabsController', function($scope) {
	$scope.tab = 1; // ng-init="tab=1"
	$scope.changeTab = function(tabValue) {
		$scope.tab = tabValue;
	};
	$scope.isTabSelected = function(tabValue) {
		return $scope.tab === tabValue;
	};
});

// Filter(s)
storeModule.filter('priceDiscount', function() {
	return function(originalPrice, discount) {
		if (discount) {
			return originalPrice - discount;
		}
		return originalPrice - 1;
	};
});

// Directive(s)
storeModule.directive("productTitle", function() {
	return {
		restrict : "E",
		replace : true,
		scope : false,
		templateUrl : "templates/product-title.html",
		link : function(scope, tEle, tAttr) {
			tEle.on('mouseenter', function() {
				tEle.css('background-color', '#def');
			});
			tEle.on('mouseleave', function() {
				tEle.css('background-color', '#fff');
			});
		}
	};
});
storeModule.directive("productTabs", function() {
	return {
		restrict : "E",
		replace : true,
		scope : false,
		templateUrl : "templates/product-tabs.html",
		controller : "TabsController"
	};
});
storeModule.directive("productReviewForm", function() {
	return {
		restrict : "E",
		replace : true,
		scope : false,
		templateUrl : "templates/product-review-form.html",
		controller : function($scope) {
			$scope.newReview = {
				user : 'nag@gmail.com'
			};
			$scope.addNewReview = function(product) {
				// .....
				product.reviews.push($scope.newReview);
				$scope.newReview = {
					user : 'nag@gmail.com'
				};
			};
		}
	};
});
// ------------------------------------------------------------------
