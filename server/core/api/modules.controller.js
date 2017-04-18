// module dependencies
const fs    = require('fs');
const path 	= require('path');
const $auth = require(`${__services}/auth`);

/**
 * Module controller
 */
class ModuleController {
  constructor(){
    // set all directories in API folder
    this.actions = fs.readdirSync(__api);
  }

  /**
   * @param router {Object} express router
   * @return {Object} express router
   */
  getRoutes(router){
  	// all modules
  	this.actions.forEach(parent => {
  		// module config
		  let _config = require(`${__api}/${parent}/config`);
		  // module controller
	  	let controller = require(`${__api}/${parent}`);
	  	// keys as routes
	  	let _routes = Object.keys(_config);

	  	// children routes
	  	_routes.forEach(key => {
	  		// route config
		    let route = _config[key];

		    // if child contains children
		    if (route.children) {
		    	route.children.forEach(child => {
		    		this.registerRoute(parent, child, router, controller[child.methodName]);
		    	})
		    } 

		    // single route (without children)
		    else {
		    	this.registerRoute(parent, route, router, controller[key]);
		    }
		  })
		})

  	return router;
  }

  /**
   * @param parent {String} parent name (module name)
   * @param route {Object} route config
   * @param router {Object} express router
   * @param controller {Function} method in controller
   * @return {Object} express router with registered route
   */
  registerRoute(parent, route, router, controller){
  	let {path, method, access, middlewares} = route;

    if (!middlewares) middlewares = [];

    logger.dev(` => /${parent}${path ? path : ''}, [${method.toUpperCase()}], [${access ? access : 'PUBLIC'}], method: [${controller.name}]`);

    return router[method](`/${parent}${path ? path : ''}`, $auth.apiAccess(access), ...middlewares, controller);
  }
}

module.exports = new ModuleController();