// module dependencies
const mongoose 	 	= require('mongoose');
const connection 	= require('mongoose').connection;
const seeder 			= require(`${__core}/utils/seed`);

// set mongoose Promise
mongoose.Promise = global.Promise;

/**
 * Database
 */
class Database {
	/**
	 * Close database connection
	 */
	close(){
		connection.close();
	}

	/**
	 * Drop database
	 */
	drop(){
		connection.db.dropDatabase(err => {
			if (err) 
				return err;

			else if (config.environment.seed) 
				seeder(connection);
		});
	}

	/**
	 * Error handler
	 * @param err {Object} error
	 */
	onError(err){
		logger.error('Database connection error: %s.', err.message);
	}

	/**
	 * Success connection handler
	 */
	onConnect(){
		logger.info('Database connection opened ✓');

		if (config.environment.mongo.clean)
			this.drop()
	}

	/**
	 * Connect to database
	 */
	connect(){
		connection.on('open', this.onConnect.bind(this));
		connection.on('error', this.onError);

		if (!mongoose.connection.db)
			mongoose.connect(config.environment.mongo.url, config.environment.mongo.options);
	}
}

module.exports = new Database();