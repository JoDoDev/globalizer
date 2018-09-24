/// <reference types="Cypress" />

function sendMessage(message) {
  cy.get('[data-cy="message-input"]').type(message);
  cy.get('[data-cy="submit"]').click();
}

context('Chat', () => {
  beforeEach(() => {
    cy.clearServer();
    cy.login('testUsername');
    cy.visit('/');
  });

  it('send message', () => {
    const messageText = "someMessageText";

    sendMessage(messageText);

    cy.get('[data-cy="chatbox"]').children().as('message');

    cy.get('@message').should('have.class', 'own');
    cy.get('@message').children('p').should('contain', messageText)
  });

  it('get Previous message', () => {
    const messageText = "someMessageText";

    sendMessage(messageText);

    cy.visit('/');

    cy.get('[data-cy="chatbox"]').children().as('message');

    cy.get('@message').should('have.class', 'own');
    cy.get('@message').children('p').should('contain', messageText)
  });

  it('get Previous message as other user', () => {
    const messageText = "someMessageText";

    sendMessage(messageText);

    cy.login('testUsername2');
    cy.visit('/');

    cy.get('[data-cy="chatbox"]').children().as('message');

    cy.get('@message').should('not.have.class', 'own');
    cy.get('@message').children('p').should('contain', messageText)
  });

});
