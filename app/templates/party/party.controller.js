'use strict'

const calculateAge = (dob) => {
  const ageDiff = Date.now() - dob.getTime()
  const ageDate = new Date(ageDiff)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const PartyController = (req, res) => {
  return (routeInstance, methods) => {
    const routePrefix = routeInstance._prefix
    const autofields = routeInstance.autofields
    const dobs = Object.keys(autofields)
                  .filter(key => key.startsWith(`${routePrefix}dob`) && key.endsWith('.day'))
                  .map(key => key.replace(/\.day$/, ''))
    const dobField = dobs[0]
    if (dobField) {
      const day = autofields[`${dobField}.day`]
      const month = autofields[`${dobField}.month`]
      const year = autofields[`${dobField}.year`]
      const unsure = autofields[`${dobField}_unsure`]
      const estimate = (autofields[`${dobField}_estimate`] || '').trim()
      let age = 0
      if (day && month && year) {
        const dob = new Date()
        dob.setDate(day)
        dob.setMonth(month)
        dob.setYear(year)
        if (!isNaN(dob)) {
          age = calculateAge(dob)
        }
      }
      if (!age && unsure && estimate) {
        const estimateParts = estimate.replace(' ', '')
                                      .split('-')
                                      .filter(str => !str.match(/^\D+$/))
                                      .map(str => str.replace(/\D/g, ''))
                                      .map(str => Number(str))
        if (estimateParts.length === 1) {
          let ageCandidate = estimateParts[0]
          if (ageCandidate < 125) {
            age = ageCandidate
          } else {
            const dobEstimate = new Date()
            dobEstimate.setYear(ageCandidate)
            age = calculateAge(dobEstimate)
          }
        }
      }
      autofields[`${routePrefix}age`] = age
    }

    return Promise.resolve(routeInstance)
  }
}

module.exports = PartyController

