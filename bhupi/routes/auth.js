const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', authHelpers.loginRedirect, (req, res, next)  => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    passport.authenticate('local', (err, user, info) => {
      if (user) {
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        res.status(200).json({ token: token });
      }
    })(req, res, next);
  })
  .catch((err) => { handleResponse(res, 500, 'error'); });
});

router.post('/login', authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) { handleResponse(res, 500, 'error'); }
    if (!user) { handleResponse(res, 404, 'User not found'); }
    if (user) {
      req.login(user, function (err) {
        if (err) { handleResponse(res, 500, 'error'); }
        const token = jwt.sign({ id: req.user.id }, JWT_SECRET);
        res.status(200).json({ token: token });
      });
    }
  })(req, res, next);
});

router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  handleResponse(res, 200, 'success');
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
