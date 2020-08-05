const express = require('express');
const passport = require('../auth/local');
const router = express.Router();

const taskQueue = require('../queue');
const authHelpers = require('../auth/_helpers');

router.post('/content', passport.authenticate('jwt', {session: false}), authHelpers.adminRequired, async (req, res, next)  => {
  try {
    const { id, timestamp } = await taskQueue.add({
      task: 'create_content',
      body: req.body,
    });
    res.status(201).json({ id, timestamp });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

module.exports = router;
