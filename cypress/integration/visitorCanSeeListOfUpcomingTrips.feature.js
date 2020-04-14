describe("Visitor can see list of all upcoming active trips", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/**",
      response: "fixture:trip_list.json",
    });
    cy.visit("/");
    cy.window().then((window) => {
      window.store.dispatch({
        type: "AUTHENTICATE",
        payload: { authenticated: true },
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

  it("unsuccessfully", () => {
    cy.get("#trip-list-button").click();
    cy.get("#trip-list").should(
      "contain",
      "Sorry, no active trips at this time."
    );
  });
});
