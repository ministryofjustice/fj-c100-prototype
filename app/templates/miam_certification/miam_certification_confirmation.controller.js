'use strict'

const mediatorAPI = require('./mediator-api')
const DateController = require('pflr-express-kit/app/components/Date/Date.controller')

const MIAMCertificationConfirmationController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {
        const autofields = routeInstance.autofields
        const code = autofields.miam_certification_code
        const fmcURN = (code ? code.substr(0,5) : '').toUpperCase()
        const codeValid = mediatorAPI.getMediator(fmcURN)
        let mediatorName = 'the mediator'
        if (codeValid) {
          mediatorName = mediatorAPI.getMediatorName(fmcURN)
        }
        const miamDate = DateController.getDisplayValue('miam_certification_date', null, {
          day: autofields['miam_certification_date.day'],
          month: autofields['miam_certification_date.month'],
          year: autofields['miam_certification_date.year'],
        })

        routeInstance.mediatorName = mediatorName
        routeInstance.miamDate = miamDate

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = MIAMCertificationConfirmationController