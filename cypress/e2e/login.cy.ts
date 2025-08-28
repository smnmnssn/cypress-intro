describe("Registrering, login och logout", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  it("ska kunna logga in som mäklare", () => {
    cy.visit("/login");

    cy.get("input[name=email]").type("maklare@example.com");
    cy.get("input[name=password]").type("hemligt");
    cy.get("button[type=submit]").click();

    // Kontrollera att vi hamnar på dashboard
    cy.url().should("include", "/dashboard");
    cy.contains("Välkommen, mäklare!").should("be.visible");
  });

  it("ska visa felmeddelande vid fel lösenord eller e-post", () => {
    cy.visit("/login");

    cy.get("input[name=email]").type("maklare@example.com");
    cy.get("input[name=password]").type("fel_losen");
    cy.get("button[type=submit]").click();

    cy.contains("Fel e-post eller lösenord").should("be.visible");

  });
});