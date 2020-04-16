describe("Visitor can", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "PUT",
      url: "**/**",
      response: "fixture:request_response.json"
    });
    // cy.route({
    //   method: "GET",
    //   url: "**/", // Get list of pongs for a specific ping
    //   response: "fixture:trip_requests_list.json"
    // });
    cy.visit("/");
    cy.window().then(window => {
      window.store.dispatch({
        type: "AUTHENTICATE",
        payload: { authenticated: true, userId: 1 }
      });
    });
    cy.get("#trip-list-button").click();
    cy.get("#new-trip-button").click();
    cy.get("#time").type("2020-04-13 16:30");
    cy.get("#store").type("ICA");
    cy.get("#create-trip-button")
      .contains("Create")
      .click();
    cy.get("#home").click()
  });

  it("accept a request", () => {
    // cy.get("#");
  });

  it("reject a request", () => {});
});
