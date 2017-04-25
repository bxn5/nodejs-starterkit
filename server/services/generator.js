const fs = require('fs');

class Generator {
	
  controllerTemplate (model) {
  		return `/*global
 expect, request, vars, port
 */

// module dependencies
const ${model}    = require(\`\${__models}/${model}\`\);

/**
 * ${model} controller
 */
class ${model}Controller {

  /**
   * add new ${model}
   * @param req {Object} request
   * @param res {Object} response
   * @param next {Function} next
   * @send {Object} response with ${model} object
   */
  add(req, res, next) {
    let _${model.toLowerCase()} = new ${model}(req.body);

    _${model.toLowerCase()}
      .save()
      .then(${model.toLowerCase()} => {
        let status = vars.api.status.ok;
        res.json({status, ${model.toLowerCase()}});
      })
      .then(null, error => {
        next(error);
      });
  }

  /**
   * get all ${model.toLowerCase()}
   * @param req {Object} request
   * @param res {Object} response
   * @param next {Function} next
   * @send {Object} response with ${model}
   */
  all(req, res, next) {

    ${model}
      .find()
      .then(${model.toLowerCase()}List => {
        let status = vars.api.status.ok;
        res.json({status, ${model.toLowerCase()}List});

      })
      .then(null, error => {
        next(error);
      });
  }

  /**
   * Update ${model}
   * @param req {Object} request
   * @param res {Object} response
   * @param next {Function} next
   * @send {Object} response with ${model.toLowerCase()}
   */
  update(req, res, next) {

    ${model}
      .findOneAndUpdate(req.params, req.body, { new: true })
      .then(${model.toLowerCase()} => {
        if (!${model.toLowerCase()}) {
          let error = new ApiError(404);
          return Promise.reject(error);
        }

        let status = vars.api.status.ok;
        res.json({status, ${model.toLowerCase()}});
      })
      .then(null, error => {
        next(error);
      });

  }

  /**
   * Get ${model.toLowerCase()} by id
   * @param req {Object} request
   * @param res {Object} response
   * @param next {Function} next
   * @send {Object} response with ${model.toLowerCase()}
   */
  one(req, res, next) {

    ${model}
      .findOne(req.params)
      .then(${model.toLowerCase()} => {
        if (!${model.toLowerCase()}){
          let error = new ApiError(404);
          return Promise.reject(error);
        }

        let status = vars.api.status.ok;
        res.json({status, ${model.toLowerCase()}});
      })
      .then(null, error => {
        next(error);
      });
  }

  /**
   * Delete ${model}
   * @param req {Object} request
   * @param res {Object} response
   * @param next {Function} next
   * @send {Object} response with deleted ${model.toLowerCase()} object
   */
  delete(req, res, next) {
    
    ${model}
      .findByIdAndRemove(req.params.id)
      .then(${model.toLowerCase()} => {
        if (!${model.toLowerCase()}) {
          let error = new ApiError(404);
          return Promise.reject(error);
        }

        let status = vars.api.status.ok;
        res.json({status, ${model.toLowerCase()}});
      })
      .then(null, error => {
        next(error);
      });
  }
}

module.exports = new ${model}Controller();`;
  		
  	}

  configTemplate(model) {
  		return `


/**
 * Config with API points definitions
 * @type {Object}
 */
module.exports = {
  add: {
    path: '/',
    method: 'post',
    access: [
      'ADMIN'
    ]
	},

  all: {
    path: '/',
    method: 'get'
  },

  update: {
    path: '/:_id',
    method: 'put',
    access: [
      'ADMIN'
    ]
  },

  one: {
    path: '/:_id',
    method: 'get'
  },

  delete: {
    path: '/:id',
    method: 'delete',
    access: [
      'ADMIN'
    ]
  }

};
`;
  	}

  generate (modelName) {
    if (!fs.existsSync(__services + '/generated/')){
      fs.mkdirSync(__services + '/generated/');
    }
    let dir = __services + '/generated/' + modelName + 'admin';
    dir = dir.toLowerCase();
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    fs.writeFile(dir + '/index.js', this.controllerTemplate(modelName), (err) => {
      if (err) throw err;
        console.log('The file has been saved!');
      });
    fs.writeFile(dir + '/config.js', this.configTemplate(modelName), (err) => {
      if (err) throw err;
        console.log('The file has been saved!');
    });
  }
}


module.exports = new Generator();
