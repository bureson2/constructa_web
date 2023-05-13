describe('vehicles CRUD operations', () => {

  let vehicleFactory = 'testFactory';
  let vehicleName = 'testModel';
  let vehicleRegistrationNumber = 'test123';
  let vinCode = "testVin123";
  let createdAt = '2022-01-01';
  let boughtAt = '2022-01-01';
  let vehicleMileage = '1200';

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

  it('Create vehicle', () => {
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[3]/a').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/vehicles`);

    cy.wait(500);
    cy.xpath('//*[@id="root"]/div/div/main/div/div/div/a[1]/button').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/vehicles/create`);

    cy.get('#vehicleFactory').type(vehicleFactory);
    cy.get('#vehicleName').type(vehicleName);
    cy.get('#vehicleRegistrationNumber').type(vehicleRegistrationNumber);
    cy.get('#vinCode').type(vinCode);
    cy.get('#createdAt').type(createdAt);
    cy.get('#boughtAt').type(boughtAt);
    cy.get('#vehicleMileage').type(vehicleMileage);

    cy.xpath('//*[@id="root"]/div/div/main/form/div[2]/div/button').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/vehicles.+$`));
  });

  it('Delete vehicle', () => {
    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').click();
    cy.wait(1000);
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[3]/a').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/vehicles`);

    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').type(vehicleRegistrationNumber);
    cy.wait(1000);
    cy.xpath('//*[@id="root"]/div/div/main/div/table/tbody/tr/td[6]/div/button').click();

    cy.contains(vehicleName).should('not.exist');
  })

})