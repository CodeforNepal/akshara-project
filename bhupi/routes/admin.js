const express = require('express');
const passport = require('../auth/local');
const router = express.Router();

const authHelpers = require('../auth/_helpers');

router.get('/admin', passport.authenticate('jwt', {session: false}), authHelpers.adminRequired, (req, res, next)  => {
  handleResponse(res, 200, 'success');
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
