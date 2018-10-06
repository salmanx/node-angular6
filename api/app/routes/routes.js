const Home = require("../controllers/home.controller");
const Users = require("../controllers/users.controller");
// const UsersValidators = require("../validators/users.validators");
const ChekAuthenticated = require("../services/check_authenticated");
const ChekAuthenticatedAdmin = require("../services/check_authenticated_admin");

module.exports = (app) => {
	app.get('/', Home.index);
	app.get('/users', ChekAuthenticatedAdmin,  Users.index);
	app.post('/users/sign_up', Users.signUp);
	app.post('/users/sign_in', Users.signIn);
}