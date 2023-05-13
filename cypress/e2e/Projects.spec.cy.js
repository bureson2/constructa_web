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

  it('Update project', () => {

    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').click();
    cy.wait(1000);
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[4]/a').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/projects`);

    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').type(name);
    cy.wait(1000);

    cy.xpath('//*[@id="root"]/div/div/main/div/table/tbody/tr/td[8]/a/button').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/projects.+$`));

    cy.get('#projectName').should('have.value', name);
    cy.get('#buldingFacility').should('have.value', object);
    cy.get('#timeFrom').should('have.value', startDate);
    cy.get('#timeTo').should('have.value', deadline);
    cy.get('#city').should('have.value', city);
    cy.get('#street').should('have.value', street);
    cy.get('#descriptiveNumber').should('have.value', descriptiveNumber);
    cy.get('#postCode').should('have.value', postCode);
    cy.get('#country').should('have.value', country);

    name = 'testCompany1';
    object = '654321';
    startDate = '2025-02-01T08:30';
    deadline = '2026-02-01T08:30';
    city = 'TestCity1';
    street = 'TestStreet1';
    descriptiveNumber = '22';
    postCode = '98765';
    country = 'Slovensko';

    cy.get('#projectName').clear().type(name);
    cy.get('#buldingFacility').clear().type(object);
    cy.get('#timeFrom').clear().type(startDate);
    cy.get('#timeTo').clear().type(deadline);
    cy.get('#city').clear().type(city);
    cy.get('#street').clear().type(street);
    cy.get('#descriptiveNumber').clear().type(descriptiveNumber);
    cy.get('#postCode').clear().type(postCode);
    cy.get('#country').clear().type(country);

    cy.xpath('//*[@id="root"]/div/div/main/form/div[3]/div/button').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/projects.+$`));

  })

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