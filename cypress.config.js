module.exports = {
  projectId: "hokhdi",
  e2e: {
    specPattern: 'e2e/**/*.cy.js',
    supportFile: 'support/e2e.js',
    fixturesFolder: 'fixtures',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
