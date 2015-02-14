var todoist = require('../todoist');
var q = require('q');
var funcs = ["ping", "getTimezones", "getRedirectLink", "getProductivityStats"];


var prom = todoist.login({email:'a@example.com', password:'donthackme'});

funcs.forEach(function(f){
  prom = prom.then(log).then(request_builder(f), log);
});

prom.then(log);

function log(){
  console.log(arguments);
}

function request_builder(ep,obj){
  return function(){
    return todoist.request(ep,obj);
  }
}
