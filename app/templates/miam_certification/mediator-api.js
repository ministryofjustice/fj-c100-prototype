'use strict'

const mediators = require('./mediators.json').data

const isValid = urn => !!getMediator(urn)

const getMediator = urn => {
  return mediators.filter(mediator => mediator.urn === urn)[0]
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
  getMediatorEmails
}
