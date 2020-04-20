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
      payload: { authenticated: true , 
        userId: 1, 
        userName: "Betty Baconsson", 
        communityStatus: "accepted",
        phone: "46 111 1111 111",
        address: "Street 1 Building 3 Apt 2",
        aboutMe: "Here is some text about blah, blah blah blah lalala hshshs hehehe"
      }
    });
  });

  });
  
  it('successfully access and update their profile', () => {
    cy.get("#profile-button").click()
    cy.get("#user-name").should("contain", "Betty Baconsson")
    cy.get("#user-phone").should("contain", "+46 111 1111 111")
    cy.get("#user-address").should("contain", "Street 1 Building 3 Apt 2")
  });
})
