describe("visitor can", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "PUT",
      url: "**/profiles/**",
      response: "fixture:profile_updated_response.json"
    });
    cy.visit("/");
    cy.window().then(window => {
      window.store.dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          userId: 1,
          communityStatus: "accepted",
        }
      });
    });
  });

  it("successfully access and update their profile", () => {
    cy.get("#profile-button").click();
    cy.get("#user-name").type("Betty Baconsson");
    cy.get("#user-address").type("Street 1 Building 3 Apt 2");
    cy.get("#user-phone").type("+46 111 1111 111");
    cy.get("#user-about").type("Info about myself, I'm an awesome neighbor!");
    cy.get("#update-profile-button").click()
    cy.get("#profile-update-message").should("contain", "Your profile has been updated")
  });
});
