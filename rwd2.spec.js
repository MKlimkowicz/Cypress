describe('Checks resolution differences', () => {
    beforeEach(() => {
        cy.visit('/')
        
    });

    it('Hidden hamburger menu', () => {
      cy.viewport(1920, 1080);

      cy.get('img[alt="logo"]').should('have.css', 'width', '80px');
    
      cy.get('button > img[alt="hamburger menu"]').should('be.not.visible');

      cy.get('span').contains('Enable sound').should('be.visible');

      cy.get('span').contains('Made with').should('be.visible');
      cy.get('ul[data-role="navigation list"]').should('have.css', 'text-align', 'start');
    });

    it('Mobile hamburger menu visible', () => {
      cy.viewport('iphone-7');

      cy.get('img[alt="logo"]').should('have.css', 'width', '54px');
    
      cy.get('button > img[alt="hamburger menu"]').should('be.visible');
      cy.get('button > img[alt="hamburger menu"]').click();

      cy.get('span').contains('Enable sound').should('not.be.visible');

      cy.get('span').contains('Made with').should('not.be.visible');

      cy.get('div[data-role="mobile navbar"] div').should('have.css', 'text-align', 'center');
    });
  });
;