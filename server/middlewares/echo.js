// simple middleware implementation
module.exports = (req, res, next) => {
	req.echo = 'Hello world!';
	next();
}