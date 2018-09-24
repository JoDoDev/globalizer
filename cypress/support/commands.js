Cypress.Commands.add('login', (username) => {
  cy.visit('http://localhost:4200/login');

  cy.get('[data-cy="username"]').type(username);

  cy.get('[data-cy="submit"]').click();
});

Cypress.Commands.add('clearServer', () => {
  cy.request({url:`${Cypress.env('BACKEND_API')}/clear`, method: 'POST'});
});
