'use strict'

const IndexController = (req, res) => {
  req.session.autofields = {}
  return () => Promise.resolve()
}

module.exports = IndexController