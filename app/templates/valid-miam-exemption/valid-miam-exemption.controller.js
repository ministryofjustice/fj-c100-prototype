const ValidExemptionController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const autofields = routeInstance.autofields

      routeInstance.autofields.validReasons = Object.keys(autofields)
                                                .filter(key => key.match(/^(auto|misc)-exemption-claimed/))
                                                .map(key => methods.getBlockProp(key, 'label'))

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = ValidExemptionController