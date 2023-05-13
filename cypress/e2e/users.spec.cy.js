describe('users CRUD operations', () => {

  let titlesBeforeName = "Ing.";
  let firstName = "TestFirstname";
  let lastName = "TestLastname";
  let titlesAfterName = "phd.";
  let email = "test@test.com";
  let phone = "123456789";
  let dateOfBirth = '2000-01-01';
  let birthNumber = '000101/7894';
  let city = 'TestCity';
  let street = 'TestStreet';
  let descriptiveNumber = '123';
  let postCode = '12345';
  let country = 'Česká republika';
  let bankAccount = 'CZ4725886873566716010054';
  let hourRate = '200';
  let monthSalary = '40000';
  let password = '1234';

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

  it('Create user', () => {
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[1]/a').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/users`);

    cy.xpath('//*[@id="root"]/div/div/main/div/div/div/a[1]/button').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/users/create`);

    cy.get('#titleBeforeName').type(titlesBeforeName);
    cy.get('#firstname').type(firstName);
    cy.get('#lastname').type(lastName);
    cy.get('#titleAfterName').type(titlesAfterName);
    cy.get('#email').type(email);
    cy.get('#phone').type(phone);
    cy.get('#dateOfBirth').type(dateOfBirth);
    cy.get('#birthId').type(birthNumber);
    cy.get('#city').type(city);
    cy.get('#street').type(street);
    cy.get('#descriptiveNumber').type(descriptiveNumber);
    cy.get('#postCode').type(postCode);
    cy.get('#country').type(country);
    cy.get('#bankAccount').type(bankAccount);
    cy.get('#hourRate').type(hourRate);
    cy.get('#monthSalary').type(monthSalary);
    cy.get('#password').type(password);

    cy.xpath('//*[@id="root"]/div/div/main/form/div[3]/div/button').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/users.+$`));

    cy.visit('http://localhost:3000/login');
    cy.get('#email').clear().type(email);
    cy.get('#password').clear().type(password);
    cy.get('form').submit();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  })

  it('Read original user', () => {
    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').type(lastName);
    cy.xpath('//*[@id="root"]/div/div/main/div/table/tbody/tr/td[1]/a').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/users.+$`));

    cy.wait(1000);
    cy.get('#name').should('have.value', titlesBeforeName + " " + firstName + " " + lastName + " " + titlesAfterName);
    cy.get('#email').should('have.value', email);
    cy.get('#phone').should('have.value', phone);
    cy.get('#dateOfBirth').should('have.value', dateOfBirth);
    cy.get('#birthId').should('have.value', birthNumber);
    cy.get('#address').should('have.value', city + ", " + street + " " + descriptiveNumber + ", " + postCode + ", " + country);
    cy.get('#bankAccount').should('have.value', bankAccount);
    cy.get('#hourRate').should('have.value', hourRate);
    cy.get('#monthSalary').should('have.value', monthSalary);
  })

  it('Update user', () => {
    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').type(lastName);
    cy.xpath('//*[@id="root"]/div/div/main/div/table/tbody/tr[1]/td[5]/a/button').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/users.+$`));

    email = "test1@test.com";
    phone = "987654321";
    dateOfBirth = '2001-02-02';
    birthNumber = '000101/7894';
    city = 'TestCity1';
    street = 'TestStreet1';
    descriptiveNumber = '22';
    postCode = '98765';
    country = 'Slovensko';
    bankAccount = 'CZ4725886873566716010055';
    hourRate = '250';
    monthSalary = '50000';
    password = '12345';

    cy.wait(1000);

    cy.get('#email').clear().type(email);
    cy.get('#phone').clear().type(phone);
    cy.get('#dateOfBirth').clear().type(dateOfBirth);
    cy.get('#birthId').clear().type(birthNumber);
    cy.get('#city').clear().type(city);
    cy.get('#street').clear().type(street);
    cy.get('#descriptiveNumber').clear().type(descriptiveNumber);
    cy.get('#postCode').clear().type(postCode);
    cy.get('#country').clear().type(country);
    cy.get('#bankAccount').clear().type(bankAccount);
    cy.get('#hourRate').clear().type(hourRate);
    cy.get('#monthSalary').clear().type(monthSalary);
    cy.get('#password').clear().type(password);

    cy.xpath('//*[@id="root"]/div/div/main/form/div[3]/div/button').click();

    cy.visit('http://localhost:3000/tasks');
    cy.wait(500);
    cy.visit('http://localhost:3000/users');
    cy.wait(500);

    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').type(lastName);
    cy.xpath('//*[@id="root"]/div/div/main/div/table/tbody/tr/td[1]/a').click();

    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/users.+$`));

    cy.wait(1000);
    cy.get('#name').should('have.value', titlesBeforeName + " " + firstName + " " + lastName + " " + titlesAfterName);
    cy.get('#email').should('have.value', email);
    cy.get('#phone').should('have.value', phone);
    cy.get('#dateOfBirth').should('have.value', dateOfBirth);
    cy.get('#birthId').should('have.value', birthNumber);
    cy.get('#address').should('have.value', city + ", " + street + " " + descriptiveNumber + ", " + postCode + ", " + country);
    cy.get('#bankAccount').should('have.value', bankAccount);
    cy.get('#hourRate').should('have.value', hourRate);
    cy.get('#monthSalary').should('have.value', monthSalary);
  })

  it('Delete user', () => {
    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').type(lastName);
    cy.xpath('//*[@id="root"]/div/div/main/div/table/tbody/tr/td[5]/div/button').click();

    cy.visit('http://localhost:3000/login');

    cy.get('#email').clear().type(email);
    cy.get('#password').clear().type(password);
    cy.get('form').submit();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/login`);
  })
})