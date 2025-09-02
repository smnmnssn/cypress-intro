describe("Kundlista, CRUD.", () => {
  beforeEach(() => {
    cy.task("reseed");
  });
});

// Render
it("ska visa kundlistan", () => {
  cy.visit("/clients");
  cy.get('[data-cy="clients-title"]').should("contain.text", "Kunder");
  cy.get("#client-list").should("exist");
  cy.get("#client-list").children().should("have.length.greaterThan", 0);
  cy.contains("Test User").should("exist");
  cy.get("#create-new-button").should("exist");
});

// Create new client
it("ska kunna skapa ny kund", () => {
  cy.visit("/clients");

  cy.get("#create-new-button").click();
  cy.get("input[name=name]").type("Test User");
  cy.get("input[name=email]").type("test@kund.se");
  cy.get("input[name=address]").type("Test street nr 42");
  cy.get("button[type=submit]").click();
  cy.contains("Test User").should("exist");
});

// Display error if fields are missing or wrong input
it("ska visa valideringsfel om uppgifter saknas", () => {
  cy.visit("/clients");
  cy.get("#create-new-button").click();
  cy.get("input[name=name]").type("Johan");
  cy.get("input[name=email]").type("inte_en_giltig_email");
  cy.get("input[name=address]").type("Test street nr 42");
  cy.get("button[type=submit]").click();
  cy.contains("Ogiltig e-postadress").should("be.visible");
});

// Edit existing client
it("ska kunna redigera kund", () => {
  cy.visit("/clients");
  cy.contains("Test User").parent().find("#edit-button").click();
  cy.get("input[name=name]").clear().type("Johan Johansson");
  cy.get("input[name=email]").clear().type("Johan@test.se");
  cy.get("input[name=address]").type("Test street nr 42");
  cy.get("button[type=submit]").click();
  cy.contains("Johan Johansson").should("exist");
});

// Delete existing client
it("ska kunna radera kund", () => {
  cy.visit("/clients");
  cy.get("#create-new-button").click();
  cy.get("input[name=name]").type("Johan Johansson");
  cy.get("input[name=email]").type("johan@test.se");
  cy.get("input[name=address]").type("Test Gatan 1");
  cy.get("button[type=submit]").click();
  cy.contains("Johan Johansson").parent().find(".delete-button").click();
  cy.contains("Johan Johansson").should("not.exist");
});
