/**
 * http://usejsdoc.org/
 */

(function() {

	var app = angular.module('todo');

	app.controller('TodoController', function($scope,todoStore) {

		var todos=$scope.todos = todoStore.todos;
		
		$scope.newTodo = ' ';
		$scope.editTodo = null;

		$scope.addTodo = function() {
			
			console.log('adding do...');
			console.log($scope.newTodo);
			
			var newTodo = {
				title : $scope.newTodo.trim(),
				completed : false
			};
			if (!newTodo.title) {
				console.log('Title empty...');
				return;
			}

			$scope.saving = true;

			todoStore.insert(newTodo)
			.then(function success(){
				$scope.newTodo='';
			})
			['finally'](function(){
				$scope.saving =false;
			})

		};

	});

})();