Feature('Main index page')

Scenario('Index page includes the service name', (I) => {
  I.amOnPage('/')
  I.see('Make an application under section 8 of the Children Act 1989 for a child arrangements, prohibited steps, specific issue order or to vary or discharge or ask permission to make a section 8 order')
})
