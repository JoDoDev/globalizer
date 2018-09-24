/// <reference types="Cypress" />

context('Chat', () => {
  beforeEach(() => {
    cy.clearServer();
    cy.login('test');
    cy.visit('/');
  });

  it('send message', () => {
    const messageText = "someMessageText";

    cy.get('[data-cy="message-input"]').type(messageText);
    cy.get('[data-cy="submit"]').click();

    cy.get('[data-cy="chatbox"]').children().as('message');

    cy.get('@message').should('have.class', 'own');
    cy.get('@message').children('p').should('contain', messageText)
  });

});
