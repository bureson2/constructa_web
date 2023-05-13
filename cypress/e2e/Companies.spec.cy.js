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

  it('Update company', () => {
    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').click();
    cy.wait(1000);
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[5]/a').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/companies`);

    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').type(name);
    cy.wait(1000);

    cy.xpath('//*[@id="root"]/div/div/main/div/table/tbody/tr/td[1]/a').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/companies.+$`));

    cy.get('#companyName').should('have.value', name);
    cy.get('#companyCin').should('have.value', cin);
    cy.get('#companyDin').should('have.value', din);
    cy.get('#phone').should('have.value', phone);
    cy.get('#city').should('have.value', city);
    cy.get('#street').should('have.value', street);
    cy.get('#descriptiveNumber').should('have.value', descriptiveNumber);
    cy.get('#postCode').should('have.value', postCode);
    cy.get('#country').should('have.value', country);

    cy.xpath('//*[@id="root"]/div/div/main/form/div[1]/a[1]/button').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/companies.+$`));

    name = 'testCompany1';
    din = '654321';
    cin = '654321';
    phone = "987654321";
    city = 'TestCity';
    street = 'TestStreet';
    descriptiveNumber = '123';
    postCode = '12345';
    country = 'Česká republika';

    cy.get('#companyName').clear().type(name);
    cy.get('#companyCin').clear().type(cin);
    cy.get('#companyDin').clear().type(din);
    cy.get('#phone').clear().type(phone);
    cy.get('#city').clear().type(city);
    cy.get('#street').clear().type(street);
    cy.get('#descriptiveNumber').clear().type(descriptiveNumber);
    cy.get('#postCode').clear().type(postCode);
    cy.get('#country').clear().type(country);

    cy.xpath('//*[@id="root"]/div/div/main/form/div[3]/div/button').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/companies.+$`));
  })

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