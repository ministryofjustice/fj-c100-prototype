'use strict'

const mediatorAPI = require('./mediator-api')

const MIAMCertificationController = (req, res) => {
  return (routeInstance, methods) => {
    if (req.method !== 'POST') {
      return Promise.resolve(routeInstance)
    }
    const controller = new Promise(resolve => {
      if (!routeInstance.errors || !routeInstance.errors.miam_certification_code) {
        const autofields = routeInstance.autofields
        const code = autofields.miam_certification_code
        const fmcURN = code ? code.substr(0,5) : ''
        const codeValid = mediatorAPI.isValid(fmcURN)
        if (codeValid) {
          console.log('Code good - set the values for the mediator')
        } else {
          routeInstance.errors = routeInstance.errors || {}
          routeInstance.errors.miam_certification_code = {
            property: 'instance',
            message: 'Not a valid MIAM attendance code',
            name: 'invalid-code'
          }
        }
      }

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = MIAMCertificationController