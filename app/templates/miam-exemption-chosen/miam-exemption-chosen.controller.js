'use strict'

const ExemptionChosenController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const autofields = routeInstance.autofields
      const exemptions = Object.keys(autofields).filter(key => {
        return key.match(/^(auto-)*exemption-claimed.+/) && autofields[key] === 'yes'
      })
      routeInstance.exemptions = exemptions
      routeInstance.exemptionsCount = exemptions.length

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = ExemptionChosenController