/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('pick 2 card from the player Tom Dwan', () => {
    beforeEach(() => {
      cy.visit("http://localhost:4200/")
    })
  
    it('2 player should be activ by default', () => {
      cy.get('app-player-table-frame form.activ').should('have.length', 2)
    })
    it('3 player should be activ if we click on the button to activ one more', () => {
        const a = cy.get('app-player-table-frame button.btn-activ-state').first()
        a.click()
        cy.get('app-player-table-frame form.activ').should('have.length', 3)
    });

  })
  