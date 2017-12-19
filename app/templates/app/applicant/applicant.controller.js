'use strict'

const ApplicantController = (req, res) => {
  return (route, methods) => {
    // const prefix = rout
    req.session.autofields = {}
    return () => Promise.resolve()
  }
}

module.exports = ApplicantController