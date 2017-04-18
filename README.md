# Installation
- clone the project
- install [node.js]
- install [mongodb]
- install packages ```npm i```
- install global packages ```npm i -g gulp``` and ``npm i -g mocha```

# Commands (scripts)
- tests: ```npm run test``` (watcher enabled)
- start the server (dev mode) ```gulp``` (watcher enabled)

# Seed data
The server is configured to upload seed data on its initialization. You can redefine config vars "clean" (clean db) and "seed" (upload seed data). To upload seed data use "data" folder under [seeder]. A name of a file will be used as a name of database collection.

# Structure
- logs (log files)
- seed (initial data)
- tmp (for temp data storing like file/images)
- public (for serving static files e.g. images)
- test (mocha tests)
- server (application)
 - api
 - core
 - models
 - services

# Global variables
| Variable | Description |
| ------ | ------ |
| __root | root path |
| __server | server folder path (app level) |
| __core | core folder path |
| __api | api folder path |
| __models | models folder path |
| __services | services folder path |
| __middlewares | middlewares folder path |
| ApiError | ApiError class instance (extended from Error) |
| logger | logger |
| vars | vars folder path |
| config | core/config |

# Authentication, tokens
Application uses lib [jsonwebtoken] for creating authorization tokens. Configs are in [env-config]. Service as middleware is in [auth-service].
By token definition means user's encrypted "_id". 
In every request service validates token and gets user's data from database, then puts data to the request object ```req.user = {...}``` and set ```req.isAuthenticated = true```. It happens only in case of using secure API points (see below)

# Secure and public API
1. Secure API point - requires a token. A role of a user should be defined in a config file under every API module. The example:

```
profile: {
    path: '/profile',
    method: 'get',
    access: [
        'ADMIN',
        'USER'
    ]
}
```

As you can see , the access to this API point have 2 roles of user. In case of absence in the array user will get 403 error.

2. Public API points don't require access array definition

# API structure under the hood
To define a new API point you don't have to register it somewhere, everything will be done automatically on the server start by script (see [api-service]). have to add folder into server/api. 
A name of a folder and a key in a config file are very important (see below). A route will contain:
- without children: ```@server_url:@port/@api_folder_name/@path_from_config```. You dont have to define a method of the controller. Will be used with the same name as a key (see examples below) 
- within children: ```@server_url:@port/@api_folder_name/@parent_path/@child_path```. Will be used defined method of children (see examples below) 

Folder should contains 2 file: 
Config.js (defines routes) and Index.js (controller). Let's see the example with Auth API (folder named as auth) .
- Simple route (public)
 
```
login: {
    path: '/login',
    method: 'post'
}

// localhost:4000/auth/login
// method "login" will be used from controller
```

- Secure route

```
profile: {
    path: '/profile',
    method: 'get',
    access: [
        'ADMIN',
        'USER'
    ]
}

// localhost:4000/auth/profile
// method "profile" will be used from controller
```

- With children. In case of using the same path by several methods. "methodName" is required. "path" for children isn't required

```
test: {
    path: '/test',
    children: [
        // localhost:4000/auth/test/test_super/
        // method "test_method" will be used from controller
        {
            path: '/test_super',
            method: 'get',
            methodName: 'test_method'
        },
        // localhost:4000/auth/test/
        // method "test_test" will be used from controller
        {
            method: 'put',
            methodName: 'test_test'
        }
    ]
}
```
# Middlewares
If y need to add some middlewares to your API:

```
const echoMiddleware = require(`${__middlewares}/echo`);

module.exports = {
	echo: {
		path: '/', 
		method: 'get',
		middlewares: [
			echoMiddleware
		]
	}
}
```
or if y need to use file uploading you can use [multer] as middleware

```
const multer = require('multer');

module.exports = {
  upload: {
    path: '/image',
    method: 'post',
    middlewares: [
    	multer(config.multer).single('image')
   	]
  }
}
```

# Services and other other utils
1. Mailer - [mail-service] is used to send emails (based on [nodemailer]). Main method called "sendMail" receive mail body object as the argument. 

```
let testMail = {
  from: '<petyaroshen@gmail.com>',
  to: '<petyaroshen@gmail.com>',
  subject: faker.lorem.sentence(),
  text: faker.lorem.text(),
  html: '<b>' + faker.lorem.text() + '</b>'
};

mailer.sendMail(testMail)
  .then(data =>{
    expect(data).to.have.property('response');
    expect(data.response).to.have.string('250 2.0.0 OK');
 });
```

2. Imager - [image-service] (based on [jimp]). Main method "resize" is used to resize and save images. 
```imager.resize(__root + '/test/samples/images/success.jpg', conf.folder, conf.prefix)```

# Error handling
In the application we use custom ApiError class extended from Error class of Node.js ([api-error]). It receives arguments: 
- cs - Code status (err.code, err.status)
- msg - message (err.message). Isn't required. Will be used message from config [error-codes]
- props - properties (err.properties).

The example:

```
let error = new ApiError(404, 'Incorrect login or password');
return Promise.reject(error)
```

```
let error = new ApiError(404, 'Incorrect login or password');
next(error)
```

All default or system error will be transformed to ApiError with 500 status code.
Used [winston] as a logger. Config [logger-config]. Defined levels:
1. dev - dev logs
2. info - additional info
3. server - server logs. For example used port or url
4. api - errors come from API. Like 404, 403, etc
5. error - internal errors (500)
How to use:

```
logger.dev('dev')
logger.info('info')
```

# Model validation
[mongoose-validator] is used to validate data of models. All validations are defined in server/models/*model*/validation.js 
You can define your custom messages there. All validation errors will have structure (see the example): 

```
{ 
    status: 'bad request',
    error: { 
        password: ...,
        email: ...,
        message: 'Validation failed' 
    } 
}
```


# Tests
Folder 'test/cases' is used for writing tests. All global vars can be used.

[node.js]: <http://nodejs.org>
[mongodb]: <https://www.mongodb.com/>
[winston]: <https://github.com/winstonjs/winston>
[mocha]: <https://mochajs.org/>
[mongoose-validator]: <https://github.com/leepowellcouk/mongoose-validator>
[api-error]: <https://github.com/poddubny/nodejs-starterkit/tree/master/server/core/errors/index.js>
[error-codes]: <https://github.com/poddubny/nodejs-starterkit/tree/master/server/core/config/var/index.js>
[jsonwebtoken]: <https://github.com/auth0/node-jsonwebtoken>
[nodemailer]: <https://github.com/nodemailer/nodemailer>
[jimp]: <https://github.com/oliver-moran/jimp>
[multer]: <https://github.com/expressjs/multer>
[seeder]: <https://github.com/poddubny/nodejs-starterkit/tree/master/server/core/utils/seed>
[mail-service]: <https://github.com/poddubny/nodejs-starterkit/tree/master/server/services/mailer.js>
[image-service]: <https://github.com/poddubny/nodejs-starterkit/tree/master/server/services/imager.js>
[auth-service]: <https://gitlab.speroteck.com/apoddubny/nodejs-starterkit/tree/master/server/services/auth>
[api-service]: <https://gitlab.speroteck.com/apoddubny/nodejs-starterkit/tree/master/server/core/api>
[env-config]: <https://github.com/poddubny/nodejs-starterkit/tree/master/server/core/config/environment/index.js>
[logger-config]: <https://gitlab.speroteck.com/apoddubny/nodejs-starterkit/tree/master/server/core/config/logger>
