describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Luis Guzman',
      username: 'lmaero.pro',
      password: 'topSecret'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#login-button').should('be.visible');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-button').should('be.visible');

      cy.get('#username').type('lmaero.pro');
      cy.get('#password').type('topSecret');
      cy.get('#login-button').click();

      cy.get('.notification--success')
        .should('contain', 'Logged in as lmaero.pro')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.contains('lmaero.pro logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#login-button').should('be.visible');

      cy.get('#username').type('lmaero.pro');
      cy.get('#password').type('tooLargePassword');
      cy.get('#login-button').click();

      cy.get('.notification--error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain','lmaero.pro logged in');
    });
  });
});
