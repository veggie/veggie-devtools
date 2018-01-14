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
  }
}
