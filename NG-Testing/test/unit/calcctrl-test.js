/**
 * http://usejsdoc.org/
 */

// unit test = AAA
/*
 * Arrange Act Assert
 * 
 */

describe('calcctrl test suite', function() {

	beforeEach(module('calculator')); // ng-app=""

	var $controller;

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	it('12 + 12 = 24', function() {

		// Arrange
		var $scope = {};
		var controller = $controller('CalcController', {
			$scope : $scope
		});

		$scope.first = 12;
		$scope.second = 12;

		// Act
		$scope.doArith();

		// Assert
		expect(24).toBe($scope.latest);

	});

	it('12 - 12  = 0', function() {

		// Arrange
		var $scope = {};
		var controller = $controller('CalcController', {
			$scope : $scope
		});

		$scope.first = 12;
		$scope.second = 12;

		$scope.operator = "-";

		// Act
		$scope.doArith();

		// Assert
		expect(0).toBe($scope.latest);

	});

	it('12 * 12  = 144', function() {

		// Arrange
		var $scope = {};
		var controller = $controller('CalcController', {
			$scope : $scope
		});

		$scope.first = 12;
		$scope.second = 12;

		$scope.operator = "*";

		// Act
		$scope.doArith();

		// Assert
		expect(144).toBe($scope.latest);

	});

	it('12 / 12  = 1', function() {

		// Arrange
		var $scope = {};
		var controller = $controller('CalcController', {
			$scope : $scope
		});

		$scope.first = 12;
		$scope.second = 12;

		$scope.operator = "/";

		// Act
		$scope.doArith();

		// Assert
		expect(1).toBe($scope.latest);

	});

});