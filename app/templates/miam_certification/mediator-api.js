'use strict'

const mediators = require('./mediators.json').data

const getMediators = () => mediators

const isValid = urn => !!getMediator(urn)

const getMediator = urn => {
  if (!urn) {
    return
  }
  urn = urn.toUpperCase()
  const mediators = getMediators()
  return mediators.filter(mediator => mediator.urn === urn)[0]
}

const getMediatorName = urn => {
  const mediator = getMediator(urn)
  return `${mediator.first_name} ${mediator.last_name}`
}

const getMediatorEmails = urn => {
  const mediator = getMediator(urn)
  if (!mediator || !mediator.practices) {
    return []
  }
  const emails = mediator.practices.map(practice => practice.email)
  return emails
}

module.exports = {
  isValid,
  getMediator,
  getMediatorName,
  getMediatorEmails
}
