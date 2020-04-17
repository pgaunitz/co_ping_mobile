describe("Visitor can", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "PUT",
      url: "**/**",
      response: "fixture:request_response.json",
    });
    cy.route({
      method: "GET",
      url: "**/pings/**",
      response: "fixture:trip_details",
    });
    cy.route({
      method: "POST",
      url: "**/auth/**",
      response: "fixture:user_login.json",
    });
    cy.route({
      method: "GET",
      url: "**/auth/**",
      response: "fixture:user_login.json",
    });

    cy.visit("/");

    cy.get("#login-button").contains("Login").click();
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("#submit-login").contains("Submit").click();
    // cy.window().then((window) => {
    //   window.store.dispatch({
    //     type: "AUTHENTICATE",
    //     payload: { authenticated: true, userId: 1 },
    //   });
    // });
    // cy.get("#trip-list-button").click()
    // cy.get("#new-trip-button").click();
    // cy.get("#time").type("2020-04-13 16:30");
    // cy.get("#store").type("ICA");
    // cy.get("#create-trip-button")
    //   .contains("Create")
    //   .click();
    // cy.get("#close-trip-form").click();
    // cy.get("#trip-button").click();
    // cy.get(".request-form").should("contain", "Trip Request");
    // cy.get("#item-one").type("A");
    // cy.get("#item-two").type("B");
    // cy.get("#item-three").type("C");
    // cy.get("#submit-request").click();
    // cy.get("[data-testID=header-back]").last().click({force: true});
    // cy.get("#new-trip-button").should('have.text', "New Ping");
    // cy.get("[data-testID=header-back]").last().click({force: true});
    // cy.get("#request-list-button").should('have.text', "My shopPing Board")
  });

  it("accept a request", () => {
    cy.get("#request-list-button").click();
    // cy.get("").should("contain", "ICA");
    // cy.get("").should("contain", "2020-04-13-16:30");
    cy.get("body").should("contain", "Awesome Girl");
    cy.get("body").should("contain", "Bacon");
    cy.get("body").should("contain", "Sweet guy");
    cy.get("body").should("contain", "Caramel");
    cy.get("#accept-button").click()
    cy.get("body").should("contain", "Will do something later here")
  });

  xit("reject a request", () => {});
});
