'use strict'

const ValidExemptionController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const autofields = routeInstance.autofields

      const generatedFields = {
        'auto-exemption-claimed_local-authority-involvement_section47': [
          {
            'children_known-to-authorities': 'yes'
          }
        ],
        'auto-exemption-claimed_local-authority-involvement_protection-plan': [
          {
            'children_child-protection-plan': 'yes'
          }
        ],
        'auto-exemption-claimed_without-notice': [
          {
            'without-notice': 'yes'
          }
        ],
        'auto-exemption-claimed_international-proceedings': [
          {
            '(international_jurisdiction|international_request)': 'yes'
          }
        ],
        'auto-exemption-claimed_adr_previous-exemption': [
          {
            'proceedings_exemption_13D03': 'yes'
          }
        ],
        'auto-exemption-claimed_adr_existing-proceedings-attendance': [
          {
            'proceedings_exemption_13D04': 'yes'
          }
        ],
        'auto-exemption-claimed_adr_existing-proceedings-exemption': [
          {
            'proceedings_exemption_13D05': 'yes'
          }
        ]
      }

      const mappedFields = {
        'children_known-to-authorities': 'auto-exemption-claimed_local-authority-involvement_section47',
        'children_child-protection-plan': 'auto-exemption-claimed_local-authority-involvement_protection-plan',
        'without-notice': 'auto-exemption-claimed_without-notice',
        'international_jurisdiction': 'auto-exemption-claimed_international-proceedings',
        'international_request': 'auto-exemption-claimed_international-proceedings',
        'proceedings_exemption_13D03': 'auto-exemption-claimed_adr_previous-exemption',
        'proceedings_exemption_13D04': 'auto-exemption-claimed_adr_existing-proceedings-attendance',
        'proceedings_exemption_13D05': 'auto-exemption-claimed_adr_existing-proceedings-exemption'
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