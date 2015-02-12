var todoist = require('../todoist');

// todoist.login({email:'a', password:'b'})
todoist.login({email:'maebegabbagabba@yahoo.com', password:'donthackme'})
	.then(function(args){
		todoist.request('addProject',{ name: "Something?" },log);
	}, log );

function log(){
	console.log(arguments);
}
