const ValidExemptionController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const autofields = routeInstance.autofields

      const validReasons = Object.keys(autofields)
                                                .filter(key => key.match(/^(auto|misc)-exemption-claimed/))
      if (!validReasons.length) {
        if (autofields.miam_attended === 'yes' && autofields.miam_certification === 'no') {
          const attendedKey = 'exemption-claimed_adr_previous-attendance'
          validReasons.push(attendedKey)
        }
      }

      routeInstance.validReasons = validReasons

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = ValidExemptionController