var express = require('express');
var router = express.Router();
const taskQueue = require('../queue');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('sync resource');
});

router.post('/pull', function(req, res, next) {
  taskQueue.add({
    task: 'pull'
  });
  res.send('sync pull')
});

module.exports = router;
