const SolicitorController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const applicantNames = methods.getMultipleValues('applicants', 'applicants_full-name_')
      applicantNames.shift()
      routeInstance.autofields.applicantNames = applicantNames

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = SolicitorController