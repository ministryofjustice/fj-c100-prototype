const ValidExemptionController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const autofields = routeInstance.autofields

      const validReasons = Object.keys(autofields)
                                                .filter(key => key.match(/^(auto|misc)-exemption-claimed/))
                                                .map(key => methods.getBlockProp(key, 'label'))
      if (!validReasons.length) {
        if (autofields.miam_attended === 'yes' && autofields.miam_certification === 'no') {
          const attendedKey = 'exemption-claimed_adr_previous-attendance'
          validReasons.push(methods.getBlockProp(attendedKey, 'label'))
        }
      }

      routeInstance.autofields.validReasons = validReasons

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = ValidExemptionController