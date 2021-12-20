context('Routing and hyperlinks', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get(`section[data-role="cookie bar"] > button[aria-label="accept terms of use"]`).click();
    });

    const navLink = [
        'About me',
        'Projects',
        'Activities',
        'Courses',
        'Blog',
        'Materials',
        'Testimonials',
        'Sign in',
      ];

    it('Navigation list visibility', () => {
        cy.get('ul[data-role="navigation list"]').find('li').should('have.length', 8);

        cy.get('ul[data-role="navigation list"] > li a').then(el => {
            expect(el[0]).to.contain.text('About me'),
              expect(el[1]).to.contain.text('Projects'),
              expect(el[2]).to.contain.text('Activities'),
              expect(el[3]).to.contain.text('Courses'),
              expect(el[4]).to.contain.text('Blog'),
              expect(el[5]).to.contain.text('Materials'),
              expect(el[6]).to.contain.text('Testimonials'),
              expect(el[7]).to.contain.text('Sign in')
        })
        cy.get('ul[data-role="navigation list"] > li').each((el, index) => {
            cy.get(el).should('contain.text', navLink[index]);
            cy.get(el).should('have.attr', 'aria-label', `show ${navLink[index]} section`);
          });

          cy.get('ul[data-role="navigation list"] > li a').each((el, index) => {
            const prefix = index === navLink.length - 1 ? 'authentication' : 'home';
      
            cy.request(el.prop('href')).its('status').should('eq', 200);
      
            cy.get(el).click();
      
            cy.location('pathname').should(
              'eq',
              `/${prefix}/${navLink[index].replace(/ |\s/g, '-').toLowerCase()}`,
            );
      
            cy.go('back');
    })
})});

it('Checks if user can navigate to Projects and Blog post programmaticaly', () => {
  cy.visit('/projects/chat-chatbot-genesys-javascript');
  cy.visit('/blog/javascript/es11-features');
});

it('Checks 404 not found page', () => {
  cy.visit('/wrong-page');
  cy.get('img[alt="page not found picture"]').should('be.visible');
});

it('Checks blog route', () => {
  cy.visit('/')
  cy.get('li[aria-label="show Blog section"]')
  cy.get('a[aria-label="display all posts"').click();
  cy.location(link => {
    expect(link.search).to.eq('?sortBy=date');
    expect(link.port).to.eq(3000);
    expect(link.origin).to.eq('http://localhost:3000');
    expect(link.pathname).to.eq('/blog/all');

    cy.get('select option[value="likes"]').click({ force: true });
    cy.location(link => {
      expect(link.search).to.eq('?sortBy=likes');
    });
  })});