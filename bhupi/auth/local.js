const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const authHelpers = require('./_helpers');
const init = require('./passport');
const knex = require('../db/connection');


const JWT_SECRET = "jwt_sercret_to_set";

const options = {};

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  // check to see if the username exists
  console.log("LocalStrategy: ", username, password);
  knex('users').where({ username }).first()
  .then((user) => {
    console.log("Matching User: ", user);
    if (!user) return done(null, false);
    if (!authHelpers.comparePass(password, user.password)) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
  .catch((err) => { console.log(err); return done(err); });
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
}, (jwt_payload, done) => {
  knex('users').where({ id: jwt_payload.id }).first()
  .then(user => {
    return done(null, user);
  }).catch(err => {
    return done(err, false, {
      message: 'Token not matched.'
    })
  })
}))

module.exports = passport;
