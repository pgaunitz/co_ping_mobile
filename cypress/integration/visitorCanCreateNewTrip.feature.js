describe("Visitor can", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/**",
      response: "fixture:new_trip_response.json"
    });
    cy.visit("/");
  });

  it("successfully create a new trip ping", () => {
    cy.get("#new-trip-button").click();
    cy.get("#time").type("2020-04-13 16:30");
    cy.get("#store").type("ICA");
    cy.get("#create-trip-button")
      .contains("Create")
      .click();
    cy.get("#new-trip-message").should(
      "contain",
      "Your new trip is now active"
    );
    cy.get("#close-trip-form").click()
    cy.get("#create-trip-button").should("not.exist")
  });
});

describe("Visitor can", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/**",
      response: "fixture:new_trip_error_response.json"
    });
    cy.visit("/");
  });
  it("not create a new trip without a time", () => {
    cy.get("#new-trip-button").click();
    cy.get("#time").type(" ");
    cy.get("#store").type("ICA");
    cy.get("#create-trip-button")
      .contains("Create")
      .click();
    cy.get("#new-trip-message").should(
      "contain",
      "You need to set a time for your new trip"
    );
    cy.get("#close-trip-form").click()
    cy.get("#create-trip-button").should("not.exist")
  });
});
