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
        let mediatorName = 'Mediator could not be found'
        let mediatorAddress = ''
        if (codeValid) {
          mediatorName = mediatorAPI.getMediatorName(fmcURN)
          mediatorAddress = mediatorAPI.getMediatorAddresses(fmcURN)[0]
          if (mediatorAddress) {
            mediatorAddress = mediatorAddress.replace(/\s+(\S{3,4}\s*\S{3,4})$/, ', $1')
                                             .replace(/,/g, '  \n')
          }
        }
        const miamDate = DateController.getDisplayValue('miam_certification_date', null, {
          day: autofields['miam_certification_date.day'],
          month: autofields['miam_certification_date.month'],
          year: autofields['miam_certification_date.year'],
        })

        routeInstance.mediatorName = mediatorName
        routeInstance.mediatorAddress = mediatorAddress
        routeInstance.miamDate = miamDate

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = MIAMCertificationConfirmationController