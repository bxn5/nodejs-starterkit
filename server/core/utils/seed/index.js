// module dependencies
const fs = require('fs');

// Function is used to upload seed data
module.exports = db => {
	// read data dir for files
	fs.readdir(__dirname + '/data', (err, files) => {
		// go through all json files and upload
	  files.forEach(file => {
	  	let collection = file.replace('.json', '');

	    db.collections[collection].insertMany(require(`${__dirname}/data/${file}`))
	  });
	})
}