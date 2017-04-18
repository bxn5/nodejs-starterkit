/**
 * Auth controller
 */
class EchoController {
	echo(req, res, next) {
		// send a message comes from echo middleware and defined in the config
		res.json({message: req.echo})
	}
}

module.exports = new EchoController();