describe('companies CRUD operations', () => {

  let name = 'testCompany';
  let din = '123456';
  let cin = '123456';
  let phone = "123456789";
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

  it('Create company', () => {
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[5]/a').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/companies`);

    cy.xpath('//*[@id="root"]/div/div/main/div/div/a/button').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/companies/create`);

    cy.get('#companyName').type(name);
    cy.get('#companyCin').type(cin);
    cy.get('#companyDin').type(din);
    cy.get('#phone').type(phone);
    cy.get('#city').type(city);
    cy.get('#street').type(street);
    cy.get('#descriptiveNumber').type(descriptiveNumber);
    cy.get('#postCode').type(postCode);
    cy.get('#country').type(country);

    cy.xpath('//*[@id="root"]/div/div/main/form/div[3]/div/button').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/companies.+$`));
  });

  it('Delete company', () => {
    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').click();
    cy.wait(1000);
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[5]/a').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/companies`);

    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').type(name);
    cy.wait(1000);
    cy.xpath('//*[@id="root"]/div/div/main/div/table/tbody/tr[1]/td[6]/div/button').click();

    cy.contains(cin).should('not.exist');
  })

})