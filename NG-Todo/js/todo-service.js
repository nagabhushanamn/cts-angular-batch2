/**
 * http://usejsdoc.org/
 */

(function() {

	var app = angular.module('todo');

	app.factory('todoStore', function($q) {

		var STORE_ID = 'todos';

		var store = {

			todos : [],

			_getFromLocalStorage : function() {
				return JSON.parse(localStorage.getItem(STORE_ID) || []);
			},
			_saveToLocalStorage : function(todos) {
				localStorage.setItem(STORE_ID, JSON.stringify(todos));
			},

			insert : function(todo) {
				
				console.log('inserting...');
				
				var deferred = $q.defer();

				store.todos.push(todo);
				store._saveToLocalStorage(store.todos)
				deferred.resolve(store.todos);

				return deferred.promise;

			},
			put : function(todo, index) {
				var deferred = $q.defer();

				store.todos[index] = todo;
				store._saveToLocalStorage(store.todos)
				deferred.resolve(store.todos);

				return deferred.promise;
			},
			get : function() {

				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;

			},
			'delete' : function(todo) {

				var deferred = $q.defer();

				store.todos.splice(store.todos.indexOf(todo), 1);
				deferred.resolve(store.todos);

				return deferred.promise;

			},
			clearCompleted : function() {

				var deferred = $q.defer();

				var incompleteTodos = store.todos.filter(function(todo, i) {
					return !todo.completed;
				});
				angular.copy(incompleteTodos, store.todos);
				store._saveToLocalStorage(store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;

			}

		};

		return store;
	});

})();