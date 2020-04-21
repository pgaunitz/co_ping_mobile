describe('Visitor can', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "**/communities/**",
      response: "fixture:bla_bla.json"
    })
    cy.visit("/")
  });

  it('send in a community code', () => {
    
  });
  
  
})
