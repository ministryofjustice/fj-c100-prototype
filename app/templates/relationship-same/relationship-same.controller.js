const RelationshipController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const childrenNames = []
      const children = methods.getValue('children', 0)
      for (let index = 0; index < children; index++) {
        childrenNames.push(methods.getValue(`child_used-name_${index + 1}`))
      }
      routeInstance.autofields.childrenNames = childrenNames

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = RelationshipController