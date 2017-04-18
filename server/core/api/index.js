// module dependencies
const express   = require('express');
const Modules   = require('./modules.controller');
const router    = express.Router();

logger.dev(`Registered API:`);

/**
 * Get API routes
 */
Modules.getRoutes(router)

/**
 * Route not found middleware
 * Creating error and passing it to error handler
 */
router.use((req, res, next) => {
  var err = new ApiError(404, 'API not found');
  next(err);
});

/**
 * Error handling middleware
 */
router.use((err, req, res, next) => {
  let error = new ApiError(500);
  err = error.transform(err);

  // Error json response object
  let jsonErrorResponse = {
    status: err.status,
    error: {
      route: req.originalUrl
    }
  }

  if (err.message)
    jsonErrorResponse.error.message = err.message;

  if (err.properties)
    jsonErrorResponse.error = Object.assign({}, err.properties, jsonErrorResponse.error);

  res
    .status(err.code)
    .json(jsonErrorResponse)
})

module.exports = router;