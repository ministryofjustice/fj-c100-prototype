'use strict'

const ValidExemptionController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const autofields = routeInstance.autofields

      const mappedFields = {
        'children_known-to-authorities': 'auto-exemption-claimed_local-authority-involvement_section47',
        'children_child-protection-plan': 'auto-exemption-claimed_local-authority-involvement_protection-plan',
        'without-notice': 'auto-exemption-claimed_without-notice',
        'international_jurisdiction': 'auto-exemption-claimed_international-proceedings',
        'international_request': 'auto-exemption-claimed_international-proceedings'
      }

      Object.keys(mappedFields).forEach(answer => {
        const mappedAnswer = mappedFields[answer]
        if (autofields[answer] !== 'yes') {
          delete autofields[mappedAnswer]
        }
      })
      Object.keys(mappedFields).forEach(answer => {
        const mappedAnswer = mappedFields[answer]
        if (autofields[answer] === 'yes') {
          autofields[mappedAnswer] = 'yes'
        }
      })

      const validReasons = Object.keys(autofields)
                                                .filter(key => key.match(/^(auto|misc)-exemption-claimed/))

      const attendedKey = 'exemption-claimed_adr_previous-attendance'
      if (!validReasons.length) {
        if (autofields.miam_attended === 'yes' && autofields.miam_certification === 'no') {
          autofields[attendedKey] = 'yes'
        }
      } else {
        delete autofields[attendedKey]
      }

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = ValidExemptionController