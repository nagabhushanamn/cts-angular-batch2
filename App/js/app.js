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
	console.log($filter('priceDiscount')(1000,100));

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
	make : Date.now()
}, {
	name : 'Mobile',
	price : 48000,
	description : 'New Model',
	canBuy : true,
	notAvailable : false,
	make : Date.now()
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
