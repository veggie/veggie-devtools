const path = require('path')
module.exports = {
  '/posts': {
    d: {
      results: [{
        id: 1,
        title: 'first',
        body: 'this is the content of the first post'
      }, {
        id: 2,
        title: 'second',
        body: 'this is the content of the second post'
      }]
    }
  },
  '/posts/1': {
    d: {
      id: 1,
      title: 'first',
      body: 'this is the content of the first post'
    }
  },
  '/posts/1/title': {
    d: {
      title: 'first',
    }
  },
  '/users': path.join(__dirname, './data/users.json'),
  '/users/1': path.join(__dirname, './data/user1.json'),
  '/getUser': (req, res) => {
    res.status(301).json({})
  },
  '/search?q=1': { d: 'found' },
  '/search?q=2': { d: 'not found' }
}
