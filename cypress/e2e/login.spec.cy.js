describe('Login tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.contains('Constructa');
  });

  it('succesfull login', () => {

    const username = "email@email.cz";
    const password = "1234";

    cy.get('#email').clear().type(username);
    cy.get('#password').clear().type(password);
    cy.get('form').submit();

    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  })

  it('unsuccesfull login', () => {

    const username = "email@email.cz";
    const password = "12345";

    cy.get('#email').clear().type(username);
    cy.get('#password').clear().type(password);
    cy.get('form').submit();

    cy.url().should('eq', `${Cypress.config('baseUrl')}/login`);
  })
})