// filepath: cypress/e2e/signIn.cy.test.js
/// <reference types="cypress" />

describe('Sign In page tests', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login');
  });

  it('should log in successfully with correct credentials', () => {
    cy.get('input[name="username"]').type('tomsmith');
    cy.get('input[name="password"]').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();

    // Assert successful login
    cy.get('#flash')
      .should('have.class', 'success')
      .and('contain', 'You logged into a secure area!');
  });

  it('should fail to log in with incorrect credentials', () => {
    cy.get('input[name="username"]').type('tomsmith');
    cy.get('input[name="password"]').type('NotSecretPassword!');
    cy.get('button[type="submit"]').click();

    // Assert login failure
    cy.get('button.radius[type="submit"]')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Login');
  });

  it('should log out successfully after logging in', () => {
    // Log in first
    cy.get('input[name="username"]').type('tomsmith');
    cy.get('input[name="password"]').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();

    // Log out
    cy.get('a[href="/logout"]').click();

    // Assert successful logout
    cy.get('#flash')
      .should('have.class', 'success')
      .and('contain', 'You logged out of the secure area!');
  });
});
