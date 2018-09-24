/// <reference types="Cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.clearServer();
    cy.visit('/');
  });

  it('re-route to Login', () => {
    cy.location('pathname').should('eq', '/login');
  });

  it('login with username', () => {
    cy.get('[data-cy="username"]').type('DonatoW');

    cy.get('[data-cy="submit"]').click();

    cy.location('pathname').should('eq', '/');
    cy.wrap(localStorage).its('USER_ID').should('not.eq', null);
  });
});
