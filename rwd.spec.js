describe('Checks simmilarities on all devicess', () => {
    const sizes = ['iphone-7', 'ipad-2', [1920, 1080]];
    beforeEach(()=>{
        cy.visit('/')})

    sizes.forEach(size => {
      it(`Should display logo, main image, newsletter section, cookie bar, anchor element wrapping about me section paragraph on ${size} screen`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1]);
        } else {
          cy.viewport(size);
        }
        cy.get('nav[aria-label="main navigation"] > a > img').should('have.attr', 'alt', 'logo');
        cy.get('div[data-role="about me section"] img').should('have.attr', 'alt', 'photo of Bartosz Ciach').and('have.attr', 'loading', 'lazy');
        // cy.get('div[data-role="about me section"] img').should('have.attr', 'loading', 'lazy');
        cy.get('section[data-role="cookie bar"] p').should('is.visible');
        // cy.get('button[aria-label="accept terms of use"]').click();
        // cy.get('section[data-role="newsletter container"]').should('is.visible');
        cy.get('div[data-role="scrollable container"]').scrollTo('bottom');
        cy.get('section[data-role="newsletter container"]').should('is.visible');
        cy.get('a[aria-label="read more about me"]').should('have.attr', 'href', '/about-me');
        // cy.get('a[aria-label="read more about me"]').click();
        // cy.location('pathname').should('eq', '/about-me');

      });
    });
  });