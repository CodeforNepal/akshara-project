let loggedInUser = null;

function onlyInTest(fun) {
  if (process.env.NODE_ENV === 'test') {
    return fun;
  }
  return function(req, res, next) { next(); };
}

const setLoggedInUser = function(user) {
  loggedInUser = user;
}

const fakeAuthMiddleWare = onlyInTest(function(req, res, next) {
  req.user = loggedInUser;
  next()
})

module.exports = {
  onlyInTest,
  setLoggedInUser,
  fakeAuthMiddleWare,
};
