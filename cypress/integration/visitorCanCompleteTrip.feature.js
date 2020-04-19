describe("Visitor can", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/pings/**",
      response: "fixture:will_complete_trip_details.json",
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
    cy.route({
      method: "PUT",
      url: "**/pongs/**",
      response: "fixture:complete_trip_pong_response.json",
    });
    cy.route({
      method: "PUT",
      url: "**/pings/**",
      response: "fixture:complete_trip_ping_response.json",
    });

    cy.visit("/");
    cy.get("#login-button").contains("Login").click();
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("#submit-login").contains("Submit").click();
    cy.get("#request-list-button").click();
  });
  it("can close a trip to new request", () => {
    cy.wait(500);
    cy.get(
      ":nth-child(1) > .r-backgroundColor-14lw9ot > .r-alignItems-z6ln5t"
    ).within(() => {
      cy.get("#total-cost-1").type("25,80 sek");
      cy.get("#send-cost-button-1").click();
    });
    cy.get("#cost-confirmation-message").should(
      "contain",
      "The total amount was sent to your neighbour"
    );
    cy.get("#complete-button").click();
    cy.get("#completion-message").should("contain", "Your trip is completed");
  });
});

xdescribe("Visitor can", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/pings/**",
      response: "fixture:completed_request_details.json",
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
    cy.get("#request-button").click();
  });

  it("see total cost on their pong", () => {
    cy.get("#total-cost").should("contain", "25,80 sek");
  });
});
