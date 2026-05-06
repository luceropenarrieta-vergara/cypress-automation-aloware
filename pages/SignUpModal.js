import signUpModalLocators from '../locators/signUpModalLocators'

class SignUpModal {
  inSignUpOrigin(args, callback) {
    const signUpOrigin = Cypress.env('signUpOrigin')
    if (!signUpOrigin) {
      throw new Error('signUpOrigin is not set. Call homePage.goToSignUpModal() first.')
    }

    cy.origin(signUpOrigin, { args }, callback)
  }

  assertElementVisible(selector) {
    this.inSignUpOrigin({ selector }, ({ selector }) => {
      cy.get(selector).should('be.visible')
    })
  }

  verifyWorkEmailIsVisible() {
    this.assertElementVisible(signUpModalLocators.workEmailInput())
  }

  verifyFirstNameIsVisible() {
    this.assertElementVisible(signUpModalLocators.firstNameInput())
  }

  verifyLastNameIsVisible() {
    this.assertElementVisible(signUpModalLocators.lastNameInput())
  }

  verifyCompanyNameIsVisible() {
    this.assertElementVisible(signUpModalLocators.companyNameInput())
  }

  verifyPhoneIsVisible() {
    this.assertElementVisible(signUpModalLocators.phoneInput())
  }

  verifyRecaptchaIsVisible() {
    this.assertElementVisible(signUpModalLocators.recaptchaContainer())
  }

  verifySubmitButtonIsVisible() {
    this.assertElementVisible(signUpModalLocators.submitButton())
  }

  verifyErrorMessageIsVisible(value) {
    this.inSignUpOrigin({ value }, ({ value }) => {
      cy.get('div').contains(value).should('be.visible')
    })
  }

  verifyErrorMessageIsNotVisible(value) {
    this.inSignUpOrigin({ value }, ({ value }) => {
      cy.get('div').contains(value).should('not.exist')
    })
  }

  setWorkEmailInput(value) {
    this.inSignUpOrigin(
      { selector: signUpModalLocators.workEmailInput(), value },
      ({ selector, value }) => {
        cy.get(selector).should('be.visible').clear().type(value)
      }
    )
  }

  setFirstNameInput(value) {
    this.inSignUpOrigin(
      { selector: signUpModalLocators.firstNameInput(), value },
      ({ selector, value }) => {
        cy.get(selector).should('be.visible').clear().type(value)
      }
    )
  }

  setLastNameInput(value) {
    this.inSignUpOrigin(
      { selector: signUpModalLocators.lastNameInput(), value },
      ({ selector, value }) => {
        cy.get(selector).should('be.visible').clear().type(value)
      }
    )
  }

  setCompanyNameInput(value) {
    this.inSignUpOrigin(
      { selector: signUpModalLocators.companyNameInput(), value },
      ({ selector, value }) => {
        cy.get(selector).should('be.visible').clear().type(value)
      }
    )
  }

  setPhoneNumberInput(value) {
    this.inSignUpOrigin(
      { selector: signUpModalLocators.phoneInput(), value },
      ({ selector, value }) => {
        cy.get(selector).should('be.visible').clear().type(value)
      }
    )
  }

  clickOnFirstNameInput() {
    this.inSignUpOrigin(
      { selector: signUpModalLocators.firstNameInput() },
      ({ selector }) => {
        cy.get(selector).should('be.visible').click()
      }
    )
  }

  clickOnLastNameInput() {
    this.inSignUpOrigin(
      { selector: signUpModalLocators.lastNameInput() },
      ({ selector }) => {
        cy.get(selector).should('be.visible').click()
      }
    )
  }

  clickOnCompanyNameInput() {
    this.inSignUpOrigin(
      { selector: signUpModalLocators.companyNameInput() },
      ({ selector }) => {
        cy.get(selector).should('be.visible').click()
      }
    )
  }

  clickOnPhoneNumberInput() {
    this.inSignUpOrigin(
      { selector: signUpModalLocators.phoneInput() },
      ({ selector }) => {
        cy.get(selector).should('be.visible').click()
      }
    )
  }
}

export default new SignUpModal()
