var todoist = require('../todoist');

todoist.login({email:'a@example.com', password:'donthackme'})
	.then(function(args){
		return todoist.request('addProject',{ name: "A New Project From Node" });
	}, log )
	.then(function(args){
		log(args);
	});

function log(){
	console.log(arguments);
}
