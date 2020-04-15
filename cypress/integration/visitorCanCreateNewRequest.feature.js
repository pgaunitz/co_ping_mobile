describe("Visitor can", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/**",
      response: "fixture:new_trip_response.json"
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
        payload: { authenticated: true }
      });
    });
    cy.get("#trip-list-button").click();
  });
  it("choose a trip and request three items", () => {
    cy.get("#trip-button").click()
    cy.get(".request-form").should("contain", "Trip request")
    cy.get("#item-one").type("Betty needs her bacon")
    cy.get("#item-two").type("Possum wants strawberries")
    cy.get("#item-three").type("Philip wants rice cookies")
    cy.get("#submit-request").click()
    cy.get("#request-message").should("contain", "Your request was added to this trip")
  })
});
