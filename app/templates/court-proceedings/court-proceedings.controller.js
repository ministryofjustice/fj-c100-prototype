const ProceedingsController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {
      let proceedingsOptions = []

      const childrenNames = methods.getMultipleValues('children', 'child_used-name_')
      const otherChildrenNames = methods.getMultipleValues('other-children', 'other-children_full-name_')
      if (childrenNames.length + otherChildrenNames.length > 1) {
        const childrenOptions = childrenNames.map((name, index) => {
          return {
            name: `children_${index + 1}`,
            xvalue: 'yes',
            label: name
          }
        })
        const otherChildrenOptions = otherChildrenNames.map((name, index) => {
          return {
            name: `other_children_${index + 1}`,
            xvalue: 'yes',
            label: name
          }
        })
        proceedingsOptions = [].concat(childrenOptions, otherChildrenOptions)
        // routeInstance.blocks.push({
        //   _id: 'kazaam',
        //   _blockType: 'Section',
        //   heading: 'Oh My Word',
        //   content: 'Tish-alish'
        // }, 'proceedings-children')
        routeInstance.proceedingsOptions = proceedingsOptions
        routeInstance.proceedingsName = 'proceedings-children-options'
      }

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = ProceedingsController