const ChildrenOrderController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const autofields = routeInstance.autofields

      const jtbds = Object.keys(autofields).filter(key => key.startsWith('order-jtbd') && autofields[key])
      routeInstance.autofields.jtbdCount = jtbds.length
      if (jtbds.length < 2) {
        routeInstance.blocks = []
      } else {
        routeInstance.childOrdersOptions = jtbds
        routeInstance.childOrdersName = 'child-orders'
      }

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = ChildrenOrderController
