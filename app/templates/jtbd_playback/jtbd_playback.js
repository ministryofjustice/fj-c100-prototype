const PlaybackController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const autofields = routeInstance.autofields
      const optionsBundle = []
      const orderTypes = methods.getBlockProp('collection:order-types', 'items', [])
      orderTypes.forEach(orderCollection => {
        const options = methods.getBlockProp(orderCollection, 'items', [])
        const selectedOptions = options.filter(option => autofields[option] === 'yes')
        if (selectedOptions.length) {
          optionsBundle.push({
            collection: orderCollection,
            selected: selectedOptions
          })
        }
      })

      // routeInstance.blocks = []
      routeInstance.playbackValues = optionsBundle
      routeInstance.playbackCount = optionsBundle.length || 0

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = PlaybackController

//   "controller": "app/templates/message/message",
