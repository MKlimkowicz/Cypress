describe('testselectors',( ) =>{
    beforeEach(()=>{
        cy.visit('/')
    })
    it('domelements',( ) =>{
        cy.get('body').should('have.css','font-family','silka_monoregular')
        cy.get('h2').last().contains('Newsletter',{matchCase: false})
        cy.get('img').first().should('have.attr','alt','logo')
        cy.get('li').filter(':contains("Testimonials")').should('have.attr', 'aria-label')
        cy.get('li').find(':contains("Project")').should('have.attr', 'href', '/home/projects')
        cy.get('div[data-role="activities section"]').should("exist")
        cy.get('div[data-role="activities section"]').should('not.be.visible')
        cy.get('[data-role="navigation list"]').find('[aria-label="go to auth page"]').click()
        cy.location('pathname').should('eq', '/authentication/sign-in')
    })


})
