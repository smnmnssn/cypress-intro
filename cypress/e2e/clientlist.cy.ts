describe("Kundlista, CRUD.", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  // Render
  it("ska visa kundlistan", () => {
    cy.visit("/clients");
    cy.get('[data-cy="clients-title"]').should("contain.text", "Kundhantering");
    cy.get('[data-cy="client-list"]').should("exist");
    cy.get('[data-cy="create-new-button"]').should("exist");
  });

  // Create new client
  it("ska kunna skapa ny kund", () => {
    cy.visit("/clients");

    cy.get('[data-cy="create-new-button"]').click();
    cy.get('[data-cy="input-name"]').type("Test User");
    cy.get('[data-cy="input-email"]').type("test@kund.se");
    cy.get('[data-cy="input-address"]').type("Test street nr 42");
    cy.get('[data-cy="submit-button"]').click();
    cy.contains("Test User").should("exist");
  });

  // Display error message if invalid or empty input
  it("ska visa valideringsfel om uppgifter saknas", () => {
    cy.visit("/clients");
    cy.get('[data-cy="create-new-button"]').click();
    cy.get('[data-cy="input-name"]').type("Johan");
    cy.get('[data-cy="input-email"]').type("inte_en_giltig_email");
    cy.get('[data-cy="input-address"]').type("Test street nr 42");
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="client-create-error"]').should("be.visible");
  });

  // Edit existing client
  it("ska kunna redigera kund", () => {
    cy.visit("/clients");
    cy.contains("Lisa Larsson").parent().find('[data-cy="edit-button"]').click();
    cy.get('[data-cy="input-name"]').clear().type("Anders Andersson");
    cy.get('[data-cy="input-email"]').clear().type("Anders@test.se");
    cy.get('[data-cy="input-address"]').type("Test street nr 42");
    cy.get('[data-cy="submit-button"]').click();
    cy.contains("Anders Andersson").should("exist");
  });

  // Delete existing client
  it("ska kunna radera kund", () => {
    cy.visit("/clients");
    cy.get('[data-cy="create-new-button"]').click();
    cy.get('[data-cy="input-name"]').clear().type("Calle Klasson");
    cy.get('[data-cy="input-email"]').clear().type("Calle@test.se");
    cy.get('[data-cy="input-address"]').clear().type("Test Gatan 1");
    cy.get('[data-cy="submit-button"]').click();
    cy.contains("Calle Klasson").parent().find('[data-cy="delete-button"]').click();
    cy.contains("Calle Klasson").should("not.exist");
  });
});
