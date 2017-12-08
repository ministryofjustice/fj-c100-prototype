const RelationshipController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

       const childrenNames = methods.getMultipleValues('children', 'child_used-name_')
       childrenNames.shift()
       routeInstance.autofields.childrenNames = childrenNames

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = RelationshipController