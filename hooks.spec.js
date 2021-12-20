
const cookieBar = 'section[data-role="cookie bar"]';

describe('testhooks',() =>{
    beforeEach(()=>{
        cy.visit('/')})
    
   it('hooks',() =>{
        cy.get(cookieBar).should('be.visible');
        cy.get(`${cookieBar} > button[aria-label="accept terms of use"]`)
            .click()
            .should(() => {
                expect(localStorage.getItem('termsAccepted')).to.eq('true');
            });
        cy.reload()
        cy.get(cookieBar).should('not.be.visible')

    })
})

describe('Known user', () => {
    before(() => {
        window.localStorage.setItem('termsAccepted', 'true');
    })
    it('Cookie bar not visible', () => {
        cy.get(cookieBar).should('not.be.visible')
    })
})