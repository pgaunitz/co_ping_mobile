describe("Visitor can", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "PUT",
      url: "**/pongs/1",
      response: "fixture:cancel_request_response.json",
    });
    cy.route({
      method: "GET",
      url: "**/pongs/**",
      response: "fixture:request_details",
    });
    cy.route({
      method: "POST",
      url: "**/auth/**",
      response: "fixture:user_login.json",
    });
    cy.route({
      method: "GET",
      url: "**/auth/**",
      response: "fixture:user_login.json",
    });

    cy.visit("/");

    cy.get("#login-button").contains("Login").click();
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("#submit-login").contains("Submit").click();
  });

  it("cancel a request", () => {
    cy.get("#request-button").click();
    cy.get("body").should("contain", "Bacon");
    cy.get("body").should("contain", "Shampoo");
    cy.get("#cancel-button").click()
    cy.get("#cancel-message").should("contain", "Your request has been cancelled")
  });
});
