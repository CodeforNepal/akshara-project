var express = require('express');
var router = express.Router();
const passport = require('../auth/local');
const authHelpers = require('../auth/_helpers');
const taskQueue = require('../queue');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('sync resource');
});

router.post('/pull', passport.authenticate('jwt', {session: false}), authHelpers.adminRequired, function(req, res, next) {
  taskQueue.add({
    task: 'pull'
  });
  res.send('sync pull')
});

module.exports = router;
