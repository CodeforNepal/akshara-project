const passport = require('passport');
const knex = require('../db/connection');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser: ", user);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserializeUser: ", id);
    knex('users').where({id}).first()
      .then((user) => { done(null, user); })
      .catch((err) => { done(err,null); });
  });
};
