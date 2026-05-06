import homePageLocators from '../locators/homePageLocators'

class HomePage {
  goToSignUpModal() {
    const url = Cypress.env('appUrl')

    return cy.get(homePageLocators.signUpLink())
      .invoke('attr', 'href')
      .then((href) => {
        const targetUrl = new URL(href, url)
        Cypress.env('signUpOrigin', targetUrl.origin)

        cy.origin(targetUrl.origin, { args: { url: targetUrl.href } }, ({ url }) => {
          Cypress.on('uncaught:exception', (err) => {
            if (err.message.includes('Failed to fetch')) {
              return false
            }
          })

          cy.visit(url)
        })
      })
  }
}

export default new HomePage()
