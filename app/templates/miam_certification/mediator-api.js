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

const getMediatorPractices = urn => {
  const mediator = getMediator(urn) || {}
  return mediator.practices || []
}

const getMediatorPracticeProperty = (urn, property) => {
  return getMediatorPractices(urn).map(practice => practice[property])
}

const getMediatorEmails = urn => {
  return getMediatorPracticeProperty(urn, 'email')
}

const getMediatorAddresses = urn => {
  return getMediatorPracticeProperty(urn, 'address')
}

const getMediatorPhones = urn => {
  return getMediatorPracticeProperty(urn, 'tel')
}

const getMediatorUrls = urn => {
  return getMediatorPracticeProperty(urn, 'url')
}

module.exports = {
  isValid,
  getMediator,
  getMediatorName,
  getMediatorPractices,
  getMediatorPracticeProperty,
  getMediatorEmails,
  getMediatorAddresses,
  getMediatorPhones,
  getMediatorUrls
}
