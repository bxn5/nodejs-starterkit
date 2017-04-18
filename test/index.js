// module dependencies and global vars
global._        	= require('lodash');
global.faker     	= require('faker');
global.path       = require('path');
global.chai     	= require('chai');
global.request 		= require('supertest');
global.expect   	= chai.expect;
global.should   	= chai.should();
global.service 		= require('./services');
global.__root 		= path.join(__dirname, '../');
global.__core 		= path.join(__root, '/server/core');
global.port 			= require('../server/core/config').environment.port;
global.config   	= require('../server/core/config');
global.vars 			= require('../server/core/config/var');
global.fs         = require('fs');

it('API tests', done => {
	fs.readdir('./test/cases', (err, files) => {
		files.forEach(file => {
			require(`./cases/${file}`)
		})

		done()
	})
})