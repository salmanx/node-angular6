const { check } = require('express-validator/check');

module.exports = (req, res, next) => {
	return [
		check(req.body.name, "Name must exists!").exists(),
		check(req.body.email, "Invalid email").exists().isEmail(),
		check(req.body.password, "password must exists!").exists()
	];
}