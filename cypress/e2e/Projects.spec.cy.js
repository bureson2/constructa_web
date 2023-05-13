describe('projects CRUD operations', () => {

  let name = 'testCompany';
  let object = '123456';
  let startDate = '2025-01-01T08:30';
  let deadline = '2026-01-01T08:30';
  let city = 'TestCity';
  let street = 'TestStreet';
  let descriptiveNumber = '123';
  let postCode = '12345';
  let country = 'Česká republika';

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.contains('Constructa');

    const username = "email@email.cz";
    const initEmail = "1234";
    cy.get('#email').clear().type(username);
    cy.get('#password').clear().type(initEmail);
    cy.get('form').submit();

    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });

  it('Create project', () => {
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[4]/a').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/projects`);

    cy.xpath('//*[@id="root"]/div/div/main/div/div/a/button').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/projects/create`);

    cy.get('#projectName').type(name);
    cy.get('#buldingFacility').type(object);
    cy.get('#timeFrom').type(startDate);
    cy.get('#timeTo').type(deadline);
    cy.get('#city').type(city);
    cy.get('#street').type(street);
    cy.get('#descriptiveNumber').type(descriptiveNumber);
    cy.get('#postCode').type(postCode);
    cy.get('#country').type(country);
    cy.xpath('//*[@id="root"]/div/div/main/form/div[2]/div[1]/div/div/div[1]/div[2]').type('Uvař{enter}');

    cy.xpath('//*[@id="root"]/div/div/main/form/div[3]/div/button').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/projects.+$`));


  });

  it('Delete project', () => {
    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').click();
    cy.wait(1000);
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[4]/a').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/projects`);

    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').type(name);
    cy.wait(1000);
    cy.xpath('//*[@id="root"]/div/div/main/div/table/tbody/tr/td[8]/div/button').click();

    cy.contains(object).should('not.exist');
  })

})