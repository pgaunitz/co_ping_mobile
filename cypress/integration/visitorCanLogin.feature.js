describe("User can log in", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/auth/sign_in",
      response: "fixture:user_login.json",
    });
    cy.route({
      method: "GET",
      url: "**/auth/**",
      response: "fixture:user_login.json",
    });
    cy.visit("/");
  });

  it("show a login button and form", () => {
    cy.get("#login-button").contains("Login").click();
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("#submit-login").contains("Submit").click();
    cy.get("#welcome-message").should(
      "contain",
      "Welcome back Awesome Possumsson"
    );
    cy.get("button").contains("Logout").click();
    cy.get("#logout-message").should("contain", "Hasta la vista!");
  });
});

describe("User can not log in", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/auth/sign_in",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false,
      },
    });
    cy.visit("/");
  });

  it("with invalid credentials", () => {
    cy.get("#login-button").contains("Login").click();
    cy.get("#email").type("wrongmail.com");
    cy.get("#password").type("wrong");
    cy.get("#submit-login").contains("Submit").click();
    cy.get("#login-error-message").should(
      "contain",
      "Invalid login credentials. Please try again."
    );
    cy.get("#close-login-form").contains("Close").click();
    cy.get("#login-form").should("not.exist");
  });
});
