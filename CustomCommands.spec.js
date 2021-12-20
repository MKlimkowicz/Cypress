import faker from 'faker';

context('Custom commands', () => {
  before(() => {
    cy.visit('/');
    window.localStorage.setItem('termsAccepted', 'true');
  });
  
it('Sign In Form', () => {
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password(6);

    cy.clickNavLink();
    cy.SignIn()
})
})