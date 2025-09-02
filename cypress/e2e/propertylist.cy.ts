describe("Fastighetslista, CRUD.", () => {
  beforeEach(() => {
    cy.task("reseed");
  });
});

// Render list
it("ska visa fastighetslistan", () => {
  cy.visit("/fastigheter");
  cy.get('[data-cy="property-title"]').should("contain.text", "Fastigheter");
  cy.get('[data-cy="property-list"]').should("exist");
  cy.get('[data-cy="create-new-button"]').should("exist");
});

// Create new object
it("ska kunna skapa nytt fastighetsobjekt", () => {
  cy.visit("/fastigheter");
  cy.get('[data-cy="create-new-button"]').click();
  cy.get('[data-cy="input-adress"]').type("Testvägen 1");
  cy.get('[data-cy="input-pris"]').type("4 900 000");
  cy.get('[data-cy="input-status"]').type("Såld");
});

// Edit existing object
it("ska kunna redigera ett befintligt fastighetsobjekt", () => {
  cy.visit("/fastigheter");
  cy.get('[data-cy="property-item"]')
    .first()
    .find('[data-cy="edit-button"]')
    .click();
  cy.get('[data-cy="input-adress"]').clear().type("Testvägen 2");
  cy.get('[data-cy="input-pris"]').clear().type("5 900 000");
  cy.get('[data-cy="input-status"]').clear().type("Ej såld");
  cy.get('[data-cy="submit-button"]').click();
  cy.get('[data-cy="property-item"]')
    .first()
    .within(() => {
      cy.contains("Testvägen 2");
      cy.contains("5 900 000");
      cy.contains("Ej såld");
    });
});

// Delete existing object
it("ska kunna radera ett objekt", () => {
  cy.visit("/fastigheter");
  cy.get('[data-cy="create-new-button"]').click();
  cy.get('[data-cy="input-address"]').type("Testvägen 3");
  cy.get('[data-cy="input-pris"]').type("6 100 000");
  cy.get('[data-cy="input-status"]').type("Såld");
  cy.get('[data-cy="submit-button"]').click();
  cy.contains("Testvägen 3").parent().find('[data-cy="delete-button"]').click();
  cy.contains("Testvägen 3").should("not.exist");
});

// Display error message if invalid or empty input
it("ska visa valideringsfel om data saknas eller är ogiltig", () => {
  cy.get('[data-cy="create-new-button"]').click();
  cy.get('[data-cy="submit-button"]').click();
  cy.get('[data-cy="error-message"]').should("contain.text", "Adress krävs");
  cy.get('[data-cy="error-message"]').should("contain.text", "Pris krävs");
  cy.get('[data-cy="error-message"]').should("contain.text", "Status krävs");
  cy.get('[data-cy="input-pris"]').type("not-a-number");
  cy.get('[data-cy="submit-button"]').click();
  cy.get('[data-cy="error-message"]').should(
    "contain.text",
    "Pris måste vara ett tal"
  );
});
