/**
 * http://usejsdoc.org/
 */

function f() {

	console.log('Hello...');
	var name = 'Nag';

	setTimeout(function() {
		try {
			console.log(name + ' back.. after timeout..');
			throw new Error("oops");
		} catch (e) {
			console.log('i caught ' + e);
		}
	}, 5000);

}

f();