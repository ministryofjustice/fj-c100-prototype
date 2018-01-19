const ValidExemptionController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const autofields = routeInstance.autofields

      const mappedFields = {
        'children_known-to-authorities': 'auto-exemption-claimed_local-authority-involvement_section47',
        'children_child-protection-plan': 'auto-exemption-claimed_local-authority-involvement_protection-plan'
      }

      Object.keys(mappedFields).forEach(answer => {
        const mappedAnswer = mappedFields[answer]
        if (autofields[answer] === 'yes') {
          autofields[mappedAnswer] = 'yes'
        } else {
          delete autofields[mappedAnswer]
        }
      })

      const validReasons = Object.keys(autofields)
                                                .filter(key => key.match(/^(auto|misc)-exemption-claimed/))

      const attendedKey = 'exemption-claimed_adr_previous-attendance'
      if (!validReasons.length) {
        if (autofields.miam_attended === 'yes' && autofields.miam_certification === 'no') {
          routeInstance.autofields[attendedKey] = 'yes'
        }
      } else {
        delete routeInstance.autofields[attendedKey]
      }

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = ValidExemptionController