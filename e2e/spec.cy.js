import homePage from '../pages/HomePage'
import signUpModal from '../pages/SignUpModal'

describe('Free Trial', () => {
  it("Verify 'Start free trial > Sign Up' modal is displayed correctly", () => {
    homePage.goToSignUpModal().then(() => {
      signUpModal.verifyWorkEmailIsVisible()
      signUpModal.verifyFirstNameIsVisible()
      signUpModal.verifyLastNameIsVisible()
      signUpModal.verifyCompanyNameIsVisible()
      signUpModal.verifyPhoneIsVisible()
      signUpModal.verifyRecaptchaIsVisible()
      signUpModal.verifySubmitButtonIsVisible()
    })
  })

  it("Verify 'Start free trial > Sign Up' modal is not displaying error messages when valid data is entered", () => {
    homePage.goToSignUpModal().then(() => {
      signUpModal.setWorkEmailInput('lucero.penarrieta@abc.com')
      signUpModal.setFirstNameInput('Lucero')
      signUpModal.setLastNameInput('Penarrieta')
      signUpModal.setCompanyNameInput('Aloware')
      signUpModal.setPhoneNumberInput('201-555-0123')
      signUpModal.verifyErrorMessageIsNotVisible('Please input a valid email address')
      signUpModal.verifyErrorMessageIsNotVisible('Please input the first name')
      signUpModal.verifyErrorMessageIsNotVisible('Please input the last name')
      signUpModal.verifyErrorMessageIsNotVisible('Please input the company name')
      signUpModal.verifyErrorMessageIsNotVisible('Please enter a valid phone number')
    })
  })

  it("Verify 'Start free trial > Sign Up' modal is displaying error messages when invalid data is entered", () => {
    homePage.goToSignUpModal().then(() => {
      signUpModal.setWorkEmailInput('abc')
      signUpModal.verifyErrorMessageIsVisible('Please input a valid email address')
      signUpModal.clickOnFirstNameInput()
      signUpModal.clickOnLastNameInput()
      signUpModal.clickOnCompanyNameInput()
      signUpModal.clickOnPhoneNumberInput()
      signUpModal.verifyErrorMessageIsVisible('Please input the first name')
      signUpModal.verifyErrorMessageIsVisible('Please input the last name')
      signUpModal.verifyErrorMessageIsVisible('Please input the company name')
      signUpModal.setPhoneNumberInput('555')
      signUpModal.verifyErrorMessageIsVisible('Please enter a valid phone number')
    })
  })
})
