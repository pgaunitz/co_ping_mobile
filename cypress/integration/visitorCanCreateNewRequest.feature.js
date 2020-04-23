describe("Visitor can", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/**",
      response: "fixture:new_request_response.json"
    });
    cy.route({
      method: "GET",
      url: "**/pings",
      response: "fixture:trip_list.json"
    });
    cy.visit("/");
    cy.window().then(window => {
      window.store.dispatch({
        type: "AUTHENTICATE",
        payload: { authenticated: true, userId: 1, communityStatus: "accepted" }
      });
    });
    cy.get("#trip-list-button").click();
  });

  it("choose a trip and request three items", () => {
    cy.get("#trip-button").click();
    cy.get(".request-form").should("contain", "Trip Request");
    cy.get("#item-one").type("A");
    cy.get("#item-two").type("B");
    cy.get("#item-three").type("C");
    cy.get("#submit-request").click();
    cy.get("#request-message").should(
      "contain",
      "Your request was added to this trip"
    );
  });
});

describe("Visitor cannot", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/**",
      status: 200,
      response: "fixture:new_empty_request_response.json"
    });
    cy.route({
      method: "GET",
      url: "**/pings",
      response: "fixture:trip_list.json"
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
      })
    })
    cy.get("#trip-list-button").click();
  });

  it("send an empty request three items", () => {
    cy.get("#trip-button").click();
    cy.get(".request-form").should("contain", "Trip Request");
    cy.get("#submit-request").click();
    cy.get("#request-message").should(
      "contain",
      "You have to specify what items you need"
    );
  });
});
