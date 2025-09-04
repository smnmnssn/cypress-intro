describe("Fastighetslista, CRUD.", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  // Render list
  it("ska visa fastighetslistan", () => {
    cy.visit("/properties");
    cy.get('[data-cy="property-title"]').should("contain.text", "Fastigheter");
    cy.get('[data-cy="property-list"]').should("exist");
    cy.get('[data-cy="create-new-button"]').should("exist");
    cy.contains("Testgatan 1");
  });

  // Create new object
  it("ska kunna skapa nytt fastighetsobjekt", () => {
    cy.visit("/properties");
    cy.get('[data-cy="create-new-button"]').click();

    cy.get('[data-cy="property-create-form"]').within(() => {
      cy.get('[data-cy="input-adress"]').type("Testvägen 1");
      cy.get('[data-cy="input-pris"]').type("4900000");
      cy.get('[data-cy="input-status"]').type("Såld");
      cy.get('[data-cy="submit-button"]').click();
    });

    cy.contains("Testvägen 1");
  });

  // Edit existing object
  it("ska kunna redigera ett befintligt fastighetsobjekt", () => {
    cy.visit("/properties");
    cy.get('[data-cy="property-item"]')
      .first()
      .find('[data-cy="edit-button"]')
      .click();
    cy.get('[data-cy="input-adress"]').clear().type("Testvägen 2");
    cy.get('[data-cy="input-pris"]').clear().type("5900000");
    cy.get('[data-cy="input-status"]').clear().type("Ej såld");
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="property-item"]')
      .first()
      .within(() => {
        cy.contains("Testvägen 2");
        cy.contains("5900000");
        cy.contains("Ej såld");
      });
  });

  // Delete existing object
  it("ska kunna radera ett objekt", () => {
    cy.visit("/properties");
    cy.get('[data-cy="create-new-button"]').click();
    cy.get('[data-cy="property-create-form"]').within(() => {
      cy.get('[data-cy="input-adress"]').type("Testvägen 3");
      cy.get('[data-cy="input-pris"]').type("6100000");
      cy.get('[data-cy="input-status"]').type("Såld");
      cy.get('[data-cy="submit-button"]').click();
    });
    cy.contains("Testvägen 3")
      .parent()
      .find('[data-cy="delete-button"]')
      .click();
    cy.contains("Testvägen 3").should("not.exist");
  });

  // Display error message if invalid or empty input
  it("ska visa valideringsfel om data saknas eller är ogiltig", () => {
    cy.visit("/properties");
    cy.get('[data-cy="create-new-button"]').click();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="error-message"]').should("have.length", 3);
    cy.get('[data-cy="input-pris"]').type("not-a-number");
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="error-message"]').should(
      "contain.text",
      "Pris är obligatoriskt"
    );
  });
});
