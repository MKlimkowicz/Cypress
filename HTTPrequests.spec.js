import faker from 'faker';

context('HTTP requests', () => {
  before(() => {
    cy.visit('/');
    window.localStorage.setItem('termsAccepted', 'true');
  });

  const HOST_URL = 'x'; 

  describe('Testimonials', () => {
    it('Fetch testimonials programmatically', () => {
      cy.request(`${HOST_URL}/testimonials`).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.testimonials).to.not.be.empty;
        expect(response.body.testimonials).to.have.length(11);
        expect(response.headers).to.be.an('Object');
        expect(response).to.have.property('headers');

        response.body.testimonials.forEach(item => {
          expect(item).to.include.all.keys(
            'refereeName',
            'refereeCompany',
            'refereeCompanyWebsite',
            'refereeProfile',
            'refereePhoto',
            'content',
          );

          expect(item._id).to.be.a('string');
          expect(item.refereeCompany).to.be.a('string');
          expect(item.refereePosition).to.be.a('string');
        });
      });
    });
  });

  describe('Newsletter', () => {
    it('Subscribe to newsletter programmatically', () => {
      const fakeEmail = faker.internet.email();
      cy.request({
        url: `${HOST_URL}/newsletter`,
        method: 'POST',
        body: {
          email: fakeEmail,
        },
      }).then(({ status, body: { email }, headers }) => {
        expect(status).to.eq(200);
        expect(headers['content-type']).to.exist;
        expect(headers['content-type']).to.eq('application/json; charset=utf-8');
        expect(email).to.exist;
        expect(email).to.be.a.string;
        expect(email).to.eq(fakeEmail);
      });
    });
  });

  describe('User account', () => {
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password(6);

    it('Creates user account programmatically', () => {
      cy.request({
        url: `${HOST_URL}/users/sign-up`,
        method: 'POST',
        body: {
          email: fakeEmail,
          password: fakePassword,
        },
      }).then(({ status, body: { token, user } }) => {
        expect(status).to.eq(200);
        expect(token).to.exist;
        expect(token).to.be.a.string;
        expect(user.authMethod).to.eq('local');
      });
    });

    it('Checks programmatically if registering same email twice is not allowed ', () => {
      cy.request({
        url: `${HOST_URL}/users/sign-up`,
        method: 'POST',
        body: {
          email: fakeEmail,
          password: fakePassword,
        },
        failOnStatusCode: false,
      }).then(({ status, body: { token, user } }) => {
        expect(status).to.eq(403);
        expect(token).to.not.exist;
        expect(user).to.not.exist;
      });
    });

    it('Sign in user programmatically', () => {
      cy.request({
        url: `${HOST_URL}/users/sign-in`,
        method: 'POST',
        body: {
          email: fakeEmail,
          password: fakePassword,
        },
      }).then(({ status, body: { token, user } }) => {
        expect(status).to.eq(200);
        expect(token).to.exist;
        expect(token).to.be.a.string;
        expect(user).to.be.an('Object');
        expect(user.authMethod).to.eq('local');
      });
    })
;

    it('Stub response for sign in feature and test UI', () => {
      const fakeEmail = faker.internet.email();
      const fakePassword = faker.internet.password(6);

      cy.intercept(`/users/sign-in`, { fixture: 'user.json' }).as('sign-in');

      cy.get('li[aria-label="show Sign in section"]').click();

      cy.get('form').within(() => {
        cy.get('input[type="email"]').type(fakeEmail.toLowerCase());
        cy.get('input[type="password"]').type(fakePassword);
        cy.get('button[type="submit"]').click();
      });
      cy.wait('@sign-in').its('response.statusCode').should('eq', 200);
      cy.location('pathname').should('eq', '/profile/user-details');
      cy.contains('Account details').should('be.visible');
    });
  });
});
