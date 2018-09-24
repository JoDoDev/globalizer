declare namespace Cypress {
  interface Chainable {
    login: (username: string) => void;
    clearServer: () => void;
  }
}
