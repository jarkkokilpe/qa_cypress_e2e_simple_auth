/// <reference types="cypress" />

describe('Sign In page', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login');
  });

  it('should log in successfully with correct credentials', () => {
    cy.get('input[name="username"]').type('tomsmith');
    cy.get('input[name="password"]').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();

    // Assert successful login
    cy.get('a[href="/logout"]').should('be.visible');
  });

  it('should fail to log in with incorrect credentials', () => {
    cy.get('input[name="username"]').type('tomsmith');
    cy.get('input[name="password"]').type('NotSecretPassword!');
    cy.get('button[type="submit"]').click();

    // Assert login failure
    cy.get('.error').should('contain', 'Your username is invalid!');
  });

  it('should log out successfully', () => {
    // Log in first
    cy.get('input[name="username"]').type('tomsmith');
    cy.get('input[name="password"]').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();

    // Log out
    cy.get('a[href="/logout"]').click();

    // Assert successful logout
    cy.get('button[type="submit"]').should('be.visible');
  });
});
