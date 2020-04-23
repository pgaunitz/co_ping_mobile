describe("Visitor can", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/pings/**",
      response: "fixture:trip_details.json"
    });
    cy.route({
      method: "POST",
      url: "**/auth/**",
      response: "fixture:user_login.json"
    });
    cy.route({
      method: "GET",
      url: "**/auth/**",
      response: "fixture:user_login.json"
    });
    cy.route({
      method: "PUT",
      url: "**/pings/**",
      response: "fixture:close_trip_response.json"
    });

    cy.visit("/")
    cy.window()
      .then((window) => {
        window.store.dispatch({
          type: "AUTHENTICATE",
          payload: {
            authenticated: true,
            userId: 1,
            communityStatus: "accepted",
          },
        })
      })
    cy.get("#request-list-button").click();
  });
  it("can close a trip to new request", () => {
    cy.get("#close-trip-button").click();
    cy.get("#close-trip-message").should(
      "contain",
      "You are ready to go shopping, don't forget the receipts!"
    );
  });
});
