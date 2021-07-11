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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'lmaero.pro', password: 'topSecret' });
    });

    it('A blog can be created', function () {
      cy.get('#log-out-button').should('be.visible');

      cy.contains('Create new Blog').click();

      cy.get('#BlogTitle').should('be.visible');
      cy.get('#BlogAuthor').should('be.visible');
      cy.get('#BlogURL').should('be.visible');

      cy.get('#BlogTitle').type('A blog created using cypress');
      cy.get('#BlogAuthor').type('Luis Guzman');
      cy.get('#BlogURL').type('https://lmaero.pro');

      cy.get('#create-blog-button').click();
      cy.contains('A blog created using cypress');
    });
  });
});
