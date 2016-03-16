/**
 * http://usejsdoc.org/
 */

var storeModule = angular.module('store', []);

// Controller(s)
storeModule.controller('StoreController', function($scope, $filter) {

	// logic
	// this.product = item;
	// $scope.product = item; // View-Model
	$scope.products = items;

	console.log($filter('limitTo')($scope.products, 1));
	console.log($filter('uppercase')('nag'));
	console.log($filter('priceDiscount')(1000, 100));

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

storeModule.controller('ReviewFormController', function($scope) {
	$scope.newReview = {
			user:'nag@gmail.com'
	};
	$scope.addNewReview = function(product) {
		// .....
		product.reviews.push($scope.newReview);
		$scope.newReview = {
				user:'nag@gmail.com'
		};
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

// ------------------------------------------------------------------

// data ( Model )
var items = [ {
	name : 'Laptop',
	price : 148000, // number
	description : 'New Model',
	canBuy : true,
	notAvailable : false,
	make : Date.now(),
	reviews : [ {
		rating : 4,
		date : Date.now(),
		comments : 'good to buy',
		user : 'naga@gmail.com'
	}, {
		rating : 3,
		date : Date.now(),
		comments : 'bad to buy',
		user : 'indu@gmail.com'
	} ]
}, {
	name : 'Mobile',
	price : 48000,
	description : 'New Model',
	canBuy : true,
	notAvailable : false,
	make : Date.now(),
	reviews : [ {
		rating : 4,
		date : Date.now(),
		comments : 'good to buy',
		user : 'naga@gmail.com'
	}, {
		rating : 3,
		date : Date.now(),
		comments : 'bad to buy',
		user : 'indu@gmail.com'
	} ]
} ];

// ( Imperative Programming )

// using DOM

// plain-JS
// document.querySelector("h4").innerHTML = item.name;
// document.querySelector("h5").innerHTML = item.price;
// document.querySelector("p").innerHTML = item.description;

// jquery
// $(function(){
// $("h4").text(item.name);
// $("h5").text(item.price);
// $("p").text(item.description);
// });
