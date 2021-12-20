const A11Y_OPTIONS = {
    runOnly: {
        type: 'tag',
        values: ['section508']
    }
}
context('Check accessibility', () => {
    it('Should pass accesibility tests', () => {
    cy.visit('/')
    cy.injectAxe();
    cy.checkA11y()
    })
})