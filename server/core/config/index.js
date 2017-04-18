// module dependencies
const pretty 	= require('prettyjson');

module.exports = {
	environment: require('./environment'),
	logger: require('./logger'),
	multer: require('./multer'),
	var: require('./var'),

	renderConfig: () => {
		console.log(
		  'Config:\n' + '==================================\n' +
		  pretty.render({config: config.environment},{
		    numberColor: 'yellow',
		    keysColor: 'cyan',
		    indent: 2
		  })
		  + '\n=================================='
		)
	}
}