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
describe('tests of the component app-player-table-frame', () => {
    beforeEach(() => {
      cy.visit("http://localhost:4200/");
      cy.contains('app-player-table-frame', 'Tom').as('TomTableBox')
      cy.get('@TomTableBox').find('app-card').first().as('firstCardTom')

    })

    
    it('should have the good config', () => {
      let myConfig = Cypress.config()
      expect(myConfig).to.have.property('viewportHeight', 1000)
      expect(myConfig).to.have.property('viewportWidth', 1500)
    });
    it('2 player should be activ by default', () => {
      cy.get('app-player-table-frame form.activ').should('have.length', 2)
    })
    it('3 player should be activ if we click on the button to activ one more', () => {
        const a = cy.get('app-player-table-frame button.btn-activ-state').first()
        a.click()
        cy.get('app-player-table-frame form.activ').should('have.length', 3)
    });
    it('open pick card modal on click on a card', () => {
      cy.get('@firstCardTom').children().click()
      cy.get('@TomTableBox').find('#popUp').should('be.visible')
    });
    it('open and close the popUp', () => {
      cy.clickOnTomDwanFirstCard()
      cy.get('@TomTableBox').find('#popUp').should('be.visible')
      cy.get('@firstCardTom').children().first().click()
      cy.get('@TomTableBox').find('#popUp').should('not.exist')
    })
    it('pick a card and check display', () => {
      cy.clickOnTomDwanFirstCard()
      cy.get('@TomTableBox').find('#popUp').find('button').click()
      cy.get('@firstCardTom').should('have.html', 'svg')
      cy.get('@firstCardTom').should('have', 'A')

    })
    // it('pick a card and update display', () => {
    //   cy.get('@firstCardTom').children().click()
    //   cy.get('@TomTableBox').find('#popUp').should('be.visible')
    //   cy.get('@TomTableBox').find('app-card').first().click()
    //   cy.get('@TomTableBox').find('#popUp').should('not.exist')
    //   cy.get('@firstCardTom').find('img').should('have.length', 1)
    // })
  })
  