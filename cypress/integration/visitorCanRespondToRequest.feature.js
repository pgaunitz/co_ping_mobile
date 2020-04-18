describe("Visitor can", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "PUT",
      url: "**/pongs/1",
      response: "fixture:accept_request_response.json",
    });
    cy.route({
      method: "PUT",
      url: "**/pongs/3",
      response: "fixture:reject_request_response.json",
    });
    cy.route({
      method: "GET",
      url: "**/pings/**",
      response: "fixture:trip_details",
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
    cy.get("#request-list-button").click();
  });

  it("accept a request", () => {
    cy.get("body").should("contain", "ICA");
    cy.get("body").should("contain", "2020-04-13-16:30");
    cy.get("body").should("contain", "Awesome Girl");
    cy.get("body").should("contain", "Bacon");
    cy.get("body").should("contain", "Sweet guy");
    cy.get("body").should("contain", "Caramel");
    cy.get("body").should("contain", "Little Boy");
    cy.get("body").should("contain", "Beer");
    cy.get("#accept-button-1").click()
    cy.get("#accept-button-1").should("not.exist")
  });

  it("reject a request", () => {
    cy.get("body").should("contain", "ICA");
    cy.get("body").should("contain", "2020-04-13-16:30");
    cy.get("body").should("contain", "Awesome Girl");
    cy.get("body").should("contain", "Bacon");
    cy.get("body").should("contain", "Sweet guy");
    cy.get("body").should("contain", "Caramel");
    cy.get("body").should("contain", "Little Boy");
    cy.get("body").should("contain", "Beer");
    cy.get("#reject-button-3").click()
    cy.get("body").should("not.contain", "Little Boy")
  });
});
