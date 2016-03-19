/**
 * http://usejsdoc.org/
 */

// Hotel
function getSomething() {

	var promise = new Promise(function(resolve, reject) {

		setTimeout(function() {
			// resolve('PONGAL,WADA');
			reject('sorry...');
		}, 5000);

	});

	return promise;

}

// ---------------------------------------------

// trainer..

console.log('started session....');
console.log('requesting....break-fast..');
var promise = getSomething();
promise.then(function(value) {
	console.log('yummy...with ' + value);
}, function(reason) {
	console.log('oops ... need to go out...');
});
console.log('continuing with session....');