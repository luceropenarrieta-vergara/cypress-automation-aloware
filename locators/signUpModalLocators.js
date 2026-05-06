const signUpModalLocators = {
  byPlaceholder: (value) => `[placeholder="${value}"]`,
  byClassName: (value) => `[class="${value}"]`,
  byType: (value) => `[type="${value}"]`,
  workEmailInput: () => signUpModalLocators.byPlaceholder('Work email'),
  firstNameInput: () => signUpModalLocators.byPlaceholder('First name'),
  lastNameInput: () => signUpModalLocators.byPlaceholder('Last name'),
  companyNameInput: () => signUpModalLocators.byPlaceholder('Company name'),
  phoneInput: () => signUpModalLocators.byPlaceholder('201-555-0123'),
  recaptchaContainer: () => signUpModalLocators.byClassName('g-recaptcha pt-3'),
  submitButton: () => signUpModalLocators.byType('button'),
}

export default signUpModalLocators
