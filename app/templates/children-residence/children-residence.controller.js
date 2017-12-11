const ResidenceController = (req, res) => {
  return (routeInstance, methods) => {
    const controller = new Promise(resolve => {

      const autofields = routeInstance.autofields
      const applicants = methods.getValue('applicants', 1)
      const respondents = methods.getValue('respondents', 1)
      let other_parties = methods.getValue('other-parties', 0)
      if (methods.getValue('other-parties-required') !== 'yes') {
        other_parties = 0
      }
      let options = []
      const getOptions = (type, counter, options) => {
        for (let index = 1; index <= counter; index++) {
          const label = methods.getValue(`${type}_full-name_${index}`)
          if (label) {
            const name = `${type}_${index}`
            const prefixedName = routeInstance._prefix + name
            const checked = !!methods.getValue(prefixedName)
            options.push({
              name,
              label,
              checked
            })
          }
        }
        return options
      }
      options = getOptions('applicants', applicants, options)
      options = getOptions('respondents', respondents, options)
      options = getOptions('other-parties', other_parties, options)
      options.push('option:other')
      routeInstance.residenceOptions = options
      routeInstance.residenceName = 'child-residence'

      if (req.method === 'POST') {
        if (!options.filter(option => option.checked).length) {
          const prefixedErrorName = routeInstance._prefix + routeInstance.residenceName
          routeInstance.errors = routeInstance.errors || {}
          routeInstance.errors[prefixedErrorName] = {
            property: 'instance',
            message: 'This field is required',
            name: 'required'
          }
        }
      }

      resolve(routeInstance)
    })
    return controller
  }
}

module.exports = ResidenceController

//   "controller": "app/templates/message/message",

/*
{% if route._prefix %}{% set prefixedOptionName = route._prefix + prefixedOptionName %}{% endif %}

{% set applicants = getValue('applicants', 1) | int %}
{% set respondents = getValue('respondents', 1) | int %}
{% set options = [] %}
{% for i in range(0, applicants) %}
{% set applicantName = autofields['applicants_' + (i + 1) + '_full-name'] %}
{% set optionsSink = options.push({name: 'applicant_' + (i + 1), label: applicantName}) %}
{% endfor %}
{% for i in range(0, respondents) %}
{% set respondentName = autofields['respondents_' + (i + 1) + '_full-name'] %}
{% set optionsSink = options.push({name: 'respondent_' + (i + 1), label: respondentName}) %}
{% endfor %}
{{ Block.CheckboxGroup('child-residence', options=options)}}
*/