describe("Registrering, login och logout", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  // Register user.
  it("ska kunna registrera ny användare", () => {
    const userInfo = {
      email: "testuser@example.com",
      password: "s3cret",
      name: "Test User",
    };

    cy.visit("/register");
    cy.get("input[name=name]").type(userInfo.name);
    cy.get("input[name=email]").type(userInfo.email);
    cy.get("input[name=password]").type(userInfo.password);
    cy.get("input[name=confirmPassword]").type(userInfo.password);
    cy.get("button[type=submit]").click();

    // Check that we go to dashboard after registering.
    cy.url().should("include", "/dashboard");
    cy.contains("Välkommen, Test User!").should("be.visible");
  });

  // Login user.
  it("ska kunna logga in som användare", () => {
    cy.visit("/login");

    cy.get("input[name=email]").type("maklare@example.com");
    cy.get("input[name=password]").type("hemligt");
    cy.get("button[type=submit]").click();

    // Check that we go to dashboard after login.
    cy.url().should("include", "/dashboard");
    cy.contains("Välkommen, Test User!").should("be.visible");
  });

  it("ska kunna logga ut användaren", () => {
    cy.visit("/dashboard");

    cy.get("button[data-cy=logout]").click();

    cy.url().should("include", "/login");
    cy.contains("Du är nu utloggad").should("be.visible");
  });

  // Error message when using wrong pw or email.
  it("ska visa felmeddelande vid fel lösenord eller e-post", () => {
    cy.visit("/login");

    cy.get("input[name=email]").type("maklare@example.com");
    cy.get("input[name=password]").type("fel_losen");
    cy.get("button[type=submit]").click();

    cy.contains("Fel e-post eller lösenord").should("be.visible");
  });
});
