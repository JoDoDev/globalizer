/// <reference types="Cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('login with username', () => {
    cy.get('[data-cy="username"]').type("DonatoW");

    cy.get('[data-cy="submit"]').click();

    cy.location("pathname").should("eq", "/");

  });
});
