const jwt = require('jwt-simple');
const moment = require('moment');

module.exports = {
  createToken: (user) => {

  	console.log(moment().unix());

    let payLoad = {
      sub: user,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payLoad, "secret");
  }
}


