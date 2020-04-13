describe("Vistor can", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/**",
      response: "fixture:new_trip_response.json",
    });
    cy.visit("/");
  });

  it("sucessfully create a new trip ping", () => {
    cy.get("button").contains("New Trip").click();
    cy.get("#trip-form").within(() => {
      cy.get("#time").type("YYMMDD HHMM");
      cy.get("#store").type("ICA");
      cy.get("button").contains("Create Trip").click();
    });
    cy.get("#new-trip-message").should(
      "contain",
      "You have successfully create a new shopping trip."
    );
  });
});

describe("Vistor can", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/**",
      status: 400,
      response: {
        errors: ["You MUST enter a shopping time."]
      }
    });
    cy.visit("/");
  });
  it("not create a new trip without a time", () => {
    cy.get("button").contains("New Trip").click();
    cy.get("#trip-form").within(() => {
      cy.get("#store").type("ICA");
      cy.get("button").contains("Create Trip").click();
    });
    cy.get("#trip-error-message").should(
      "contain",
      "You MUST enter a shopping time."
    );
  });
});
