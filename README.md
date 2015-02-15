**node-todoist**  [![Build Status](http://img.shields.io/travis/JTarasovic/node-todoist-api.svg?style=flat)](https://travis-ci.org/JTarasovic/node-todoist-api)
================

> An implementation of the Todoist API for Node

## Installation
`npm install node-todoist`

## API Reference
**Example**  
```js
var todoist = require('node-todoist');
```

**Members**

* [node-todoist](#module_node-todoist)
  * [todoist.login(params, [cb])](#module_node-todoist.login)
  * [todoist.request(endpoint, params, [cb])](#module_node-todoist.request)

<a name="module_node-todoist.login"></a>
####todoist.login(params, [cb])
Logs into Todoist via email and password. Necessary to get token
for authenticated requests

**Params**

- params `Object` - Object literal containing email and password.  
- \[cb\] `function` - optional callback  

**Returns**: `Promise` | `callback` - Returns a promise or invokes a callback  
**Example**  
```js
// promise style
todoist.login({email: email, password: password})
	.then(function(user){
		console.log(user)
	},
	function(e) { console.error(e); });

// callback style
todoist.login({email: email, password: password}, function(err,user){
	if(err){
		console.error(err);
		return;
	}
	console.log(user);
});
```

<a name="module_node-todoist.request"></a>
####todoist.request(endpoint, params, [cb])
Queries the specified todoist endpoint with the specified parameters.
For additional, information about `endpoint`s and `option`s, see
the [Todoist API Documentation](https://todoist.com/API/help/standard#).

**Params**

- endpoint `str` - The Todoist endpoint to be queried.  
- params `Object` - Object literal specifying the query parameters.  
- \[cb\] `function` - Optional callback parameter. Called with `err` and `data`.  

**Returns**: `Promise` | `callback` - Returns a promise or invokes a callback  
**Example**  
```js
var my_params = {
	name: "New Project",
	color: 5,
	indent: 3,
	}

// promise style
todoist.request('addProject', my_params)
	.then(function(user){
		console.log(user)
	},
	function(e) { console.error(e); });

// callback style
todoist.request('addProject', my_params), function(err,data){
	if(err){
		console.error(err);
		return;
	}
	console.log(data);
```

## Debug
node-todoist uses [`debug`](https://github.com/visionmedia/debug) for debugging.
Simply include `todoist` in the list of modules in the `DEBUG` environment variable.

`export DEBUG=todoist` or `DEBUG=todoist node my_app.js`

## Contributors

```
    57	Jason Tarasovic
```

## License


The MIT License (MIT)

Copyright (c) 2014 Jason Tarasovic

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.