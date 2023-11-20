exports.buildPath = function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://cop4331-27-c6dfafc737d8.herokuapp.com' + route;
  }
  else {
    return 'http://localhost:5000' + route;
  }
}