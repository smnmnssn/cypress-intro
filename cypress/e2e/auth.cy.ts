describe("Registrering, login och logout", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  // Check that you must be logged in to access /dashboard
  it("ska inte gå att nå /dashboard om man inte är inloggad", () => {
    cy.visit("/dashboard");
    cy.url().should("not.include", "/dashboard");
    cy.url().should("include", "/login");
    cy.contains("Logga in").should("be.visible");
  });

  // Register user.
  it("ska kunna registrera ny användare", () => {
    const userInfo = {
      email: "testuser@example.com",
      password: "s3cret",
    };

    cy.visit("/register");
    cy.get("[data-cy=email-input]").type(userInfo.email);
    cy.get("[data-cy=password-input]").type(userInfo.password);
    cy.get("[data-cy=confirm-password-input]").type(userInfo.password);
    cy.get("[data-cy=submit-button]").click();
    cy.url().should("include", "/dashboard");
    cy.contains("Välkommen, testuser@example.com!").should("be.visible");
  });

  // Login user.
  it("ska kunna logga in som användare", () => {
    cy.visit("/login");

    cy.get("[data-cy=email-input]").type("maklare@example.com");
    cy.get("[data-cy=password-input]").type("hemligt");
    cy.get("[data-cy=submit-button]").click();
    cy.url().should("include", "/dashboard");
    cy.contains("Välkommen, maklare@example.com!").should("be.visible");
  });

  // Logout user.
  it("ska kunna logga ut användaren", () => {
    cy.visit("/login");
    cy.get("[data-cy=email-input]").type("maklare@example.com");
    cy.get("[data-cy=password-input]").type("hemligt");
    cy.get("[data-cy=submit-button]").click();
    cy.url().should("include", "/dashboard");
    cy.get("[data-cy=logout]").click();
    cy.url().should("include", "/login");
  });

  // Error message when using wrong pw or email.
  it("ska visa felmeddelande vid fel lösenord eller e-post", () => {
    cy.visit("/login");
    cy.get("[data-cy=email-input]").type("maklare@example.com");
    cy.get("[data-cy=password-input]").type("fel_losen");
    cy.get("[data-cy=submit-button]").click();
    cy.contains("Fel e-post eller lösenord").should("be.visible");
  });
});
