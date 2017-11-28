'use strict'

const DateController = require('pflr-express-kit/app/components/Date/Date.controller')

const MIAMDateController = (req, res) => {
  return (routeInstance, methods) => {
    if (req.method !== 'POST') {
      return Promise.resolve(routeInstance)
    }
    const controller = new Promise(resolve => {
      const autofields = routeInstance.autofields
      const setError = (field, name, message, subFields=[]) => {
        routeInstance.errors = routeInstance.errors || {}
        routeInstance.errors[field] = {
          property: 'instance',
          message,
          name
        }
        subFields.forEach(subField => {
          routeInstance.errors[`${field}.${subField}`] = {
            property: 'instance',
            message,
            name
          }
        })
      }

      if (!routeInstance.errors || !routeInstance.errors.miam_certification_date) {
        const setDateError = (name, message) => {
          setError('miam_certification_date', name, message, ['day', 'month', 'year'])
        }
        const dates = {
          day: autofields['miam_certification_date.day'],
          month: autofields['miam_certification_date.month'],
          year: autofields['miam_certification_date.year'],
        }
        const now = new Date()
        const attendanceDate = new Date(`${dates.year}/${dates.month}/${dates.day}`)
        if (attendanceDate > now) {
          setDateError('code-future', 'Date given for MIAM attendance is in the future')
        } else {
          const allowedMonths = 4
          const allowedElapsed = allowedMonths * 31 * 24 * 60 * 60 * 1000
          const elapsed = now.getTime() - attendanceDate.getTime()
          if (elapsed > allowedElapsed) {
            routeInstance.redirect = 'route:end_miam_expired'
            // setDateError('code-expired', 'MIAM attendance took place over 4 months ago')
          }
        }
      }

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = MIAMDateController