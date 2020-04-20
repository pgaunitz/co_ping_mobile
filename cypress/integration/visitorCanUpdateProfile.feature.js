describe('visitor can', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/user/**",
      response: "fixture:existing_profile_data.json"
    });
  cy.route({
    method: "PUT",
    url: "**/user/**",
    response: "fixture:new_profile_data.json"
  });
  cy.visit("/")
  cy.window().then(window => {
    window.store.dispatch({
      type: "AUTHENTICATE",
      payload: { authenticated: true , userId: 1}
    });
  });

  });
  
  it('successfully access and update their profile', () => {
    cy.get("#profile-button").click()
    cy.get("body").should("contain", "Betty Baconsson")
    cy.get("body").should("contain", "+46 111 1111 111")
    cy.get("body").should("contain", "Street 1 Building 3 Apt 2")
  });
})
