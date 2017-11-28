'use strict'

const mediatorAPI = require('./mediator-api')

const MIAMCertificationController = (req, res) => {
  return (routeInstance, methods) => {
    if (req.method !== 'POST') {
      return Promise.resolve(routeInstance)
    }
    const controller = new Promise(resolve => {
      const autofields = routeInstance.autofields
      const setError = (field, name, message, subFields=[]) => {
        routeInstance.errors = routeInstance.errors || {}
        routeInstance.errors[field] = {
          property: 'instance',
          message,
          name
        }
        subFields.forEach(subField => {
          routeInstance.errors[`${field}.${subField}`] = {
            property: 'instance',
            message,
            name
          }
        })
      }

      if (!routeInstance.errors || !routeInstance.errors.miam_certification_code) {
        const code = autofields.miam_certification_code
        const fmcURN = (code ? code.substr(0,5) : '').toUpperCase()
        const codeValid = mediatorAPI.isValid(fmcURN)
        if (!codeValid) {
          setError('miam_certification_code', 'code-invalid', 'Not a valid MIAM attendance code')
        }
      }

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = MIAMCertificationController