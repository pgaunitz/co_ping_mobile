describe("Visitor can see list of all upcoming active trips", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/pings",
      response: "fixture:trip_list.json",
    });
    cy.visit("/");
    cy.window().then((window) => {
      window.store.dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          userId: 1,
          communityStatus: "accepted",
        },
      });
    });
  });

  it("sucessfully.", () => {
    cy.get("#trip-list-button").click();
    cy.wait(1000);
    cy.get("#trip-list").should("contain", "Coop");
    cy.get("#trip-list").should("contain", "2020-04-14 14:00");
    cy.get("#trip-list").should("contain", "Systembolaget");
    cy.get("#trip-list").should("contain", "2020-04-14 10:00");
  });
});

describe("Visitor can see list of all upcoming active trips", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/pings",
      response: {
        message:
          "Unfortunately no one has planned to go shopping, so maybe you can?",
      },
    });
    cy.visit("/");
    cy.window().then((window) => {
      window.store.dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          userId: 1,
          communityStatus: "accepted",
        },
      });
    });
  });
  
  it("unsuccessfully", () => {
    cy.get("#trip-list-button").click();
    cy.get("#trip-message").should(
      "contain",
      "Unfortunately no one has planned to go shopping, so maybe you can?"
    );
  });
});
