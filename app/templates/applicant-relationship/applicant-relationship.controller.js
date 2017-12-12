const RelationshipController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const autofields = routeInstance.autofields
      const routeIndex = routeInstance._index
      delete routeInstance.autofields.childrenNames
      if (autofields[`applicants_${routeIndex}_relationship-same`] === 'yes') {
        const childrenNames = methods.getMultipleValues('children', 'child_used-name_')
        routeInstance.autofields.childrenNames = childrenNames
      }

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = RelationshipController