'use strict'
const matchProp = require('pflr-express-kit/lib/match-prop')

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
        ],
        'auto-exemption-claimed_adr_ongoing-attendance': [
          {
            'alternative_mediation_same': 'yes',
            'alternative_mediation_when': 'ongoing'
          },
          {
            'alternative_lawyer-negotiation_same': 'yes',
            'alternative_lawyer-negotiation_when': 'ongoing'
          },
          {
            'alternative_collaborative-law_same': 'yes',
            'alternative_collaborative-law_when': 'ongoing'
          }
        ],
        'auto-exemption-claimed_adr_previous-attendance': [
          {
            'alternative_mediation_same': 'yes',
            'alternative_mediation_when': 'recent'
          },
          {
            'alternative_lawyer-negotiation_same': 'yes',
            'alternative_lawyer_negotiation_when': 'recent'
          },
          {
            'alternative_collaborative-law_same': 'yes',
            'alternative_collaborative-law_when': 'recent'
          }
        ]
      }

      Object.keys(generatedFields).forEach(key => {
        if (matchProp(autofields, generatedFields[key])) {
          autofields[key] = 'yes'
        } else {
          delete autofields[key]
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