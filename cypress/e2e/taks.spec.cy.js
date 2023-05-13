describe('tasks CRUD operations', () => {

  let taskName = "testTask";
  let taskDescription = "testDescription";
  let timeFrom = '2024-05-13T12:11';
  let timeTo = '2024-05-13T12:11';
  let location = 'testLocation';

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

  it('Create task', () => {
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[2]/a').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/tasks`);

    cy.xpath('//*[@id="root"]/div/div/main/div/div/a/button').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/tasks/create`);

    cy.get('#taskName').type(taskName);
    cy.get('#taskDescription').type(taskDescription);
    cy.get('#timeFrom').type(timeFrom);
    cy.get('#timeTo').type(timeTo);
    cy.get('#taskLocation').type(location);
    cy.xpath('//*[@id="root"]/div/div/main/form/div[2]/div[1]/div/div/div[1]/div[2]').type('Uvař{enter}');

    cy.xpath('//*[@id="root"]/div/div/main/form/div[3]/div/button').click();
  });

  it('Update task', () => {
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[2]/a').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/tasks`);

    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[1]/a').click();
    cy.wait(1000);
    cy.xpath('//*[@id="root"]/div/div/nav/ul/li[2]/a').click();

    cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').type(taskName);
    cy.xpath('//*[@id="root"]/div/div/main/div/table/tbody/tr[1]/td[7]/a/button').click();
    cy.url().should('match', new RegExp(`^${Cypress.config('baseUrl')}/tasks/edit.+$`));


    cy.get('#taskName').should('have.value', taskName);
    cy.get('#taskDescription').should('have.value', taskDescription);
    cy.get('#timeFrom').should('have.value', timeFrom);
    cy.get('#timeTo').should('have.value', timeTo);
    cy.get('#taskLocation').should('have.value', location);

    taskName = "experimentalTask";
    taskDescription = "experimentalDescription";
    timeFrom = '2025-05-13T14:11';
    timeTo = '2025-05-13T13:11';
    location = 'experimentalLocation';

    cy.get('#taskName').clear().type(taskName);
    cy.get('#taskDescription').clear().type(taskDescription);
    cy.get('#timeFrom').clear().type(timeFrom);
    cy.get('#timeTo').clear().type(timeTo);
    cy.get('#taskLocation').clear().type(location);

    cy.xpath('//*[@id="root"]/div/div/main/form/div[3]/div/button').click();
  })

  it('Delete task', () => {
      cy.xpath('//*[@id="root"]/div/div/nav/ul/li[2]/a').click();
      cy.url().should('eq', `${Cypress.config('baseUrl')}/tasks`);

      cy.xpath('//*[@id="root"]/div/div/nav/ul/li[1]/a').click();
      cy.wait(1000);
      cy.xpath('//*[@id="root"]/div/div/nav/ul/li[2]/a').click();

      cy.xpath('//*[@id="root"]/div/div/main/div/table/thead/tr[2]/td[1]/input').type(taskName);
      cy.wait(1000);
      cy.xpath('//*[@id="root"]/div/div/main/div/table/tbody/tr/td[7]/div/button').click();

    cy.contains(location).should('not.exist');
  })

})