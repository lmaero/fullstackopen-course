describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Luis Guzman',
      username: 'lmaero.pro',
      password: 'topSecret'
    };

    const anotherUser = {
      name: 'Super Admin',
      username: 'root',
      password: 't0pS3kr3t'
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser);

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
      cy.createBlog({
        author: 'Luis Guzman',
        title: 'New Blog 1',
        url: 'https://lmaero.pro' });
      cy.createBlog({
        author: 'Luis Guzman',
        title: 'New Blog 2',
        url: 'https://lmaero.pro' });
      cy.createBlog({
        author: 'Luis Guzman',
        title: 'New Blog 3',
        url: 'https://lmaero.pro'
      });

      cy.visit('http://localhost:3000');

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

    it('A blog can be liked', function () {
      cy.get('#log-out-button').should('be.visible');

      cy.contains('View details').click();
      cy.contains('Hide details').click();
      cy.contains('View details').click();

      cy.contains('Likes: 0');
      cy.get('#likes-button').click();
      cy.contains('Likes: 1');
    });
  });

  describe('When two users exists and one of them is logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'lmaero.pro', password: 'topSecret' });
      cy.createBlog({
        author: 'Luis Guzman',
        title: 'A blog created by lmaero.pro',
        url: 'https://lmaero.pro'
      });

      cy.login({ username: 'root', password: 't0pS3kr3t' });
      cy.createBlog({
        author: 'Super Admin',
        title: 'A blog created by root',
        url: 'https://lmaero.pro'
      });

      cy.visit('http://localhost:3000');

    });

    it('A blog cannot be deleted if its not authored by logged in user', function () {
      cy.get('#log-out-button').should('be.visible');

      cy.contains('View details').click();

      cy.get('.blog').then(blogs => {
        const blogCreatedByAnotherUser = blogs[0];
        cy.get(blogCreatedByAnotherUser).should('not.contain', 'Delete');
      });
    });

    it('A blog can be deleted if its authored by logged in user', function () {
      cy.get('#log-out-button').click();
      cy.login({ username: 'lmaero.pro', password: 'topSecret' });

      cy.contains('View details').click();

      cy.get('.blog').then(blogs => {
        const blogCreatedBySameUser = blogs[0];
        cy.get(blogCreatedBySameUser).should('contain', 'Delete');

        cy.contains('Delete').click();

        cy.get('.notification--success')
          .should('contain', 'A blog created by lmaero.pro removed from list')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid');
      });
    });
  });

  describe('When there are several blogs', function() {
    beforeEach(function() {
      cy.login({ username: 'lmaero.pro', password: 'topSecret' });
      cy.visit('http://localhost:3000');

      cy.createBlog({
        author: 'Luis Guzman',
        title: 'I will always be third',
        url: 'https://lmaero.pro',
        likes: 120
      });

      cy.createBlog({
        author: 'Luis Guzman',
        title: 'I will be second after two likes on the second blog',
        url: 'https://lmaero.pro',
        likes: 150
      });

      cy.createBlog({
        author: 'Luis Guzman',
        title: 'I will be first after two likes on me',
        url: 'https://lmaero.pro',
        likes: 149
      });

      cy.visit('http://localhost:3000');

    });

    it.only('Blogs appear ordered by number of likes', function () {
      cy.get('#log-out-button').should('be.visible');

      cy.get('.blog').then(blogs => {
        const firstBlog = blogs[ 0 ];
        const secondBlog = blogs[1];
        const thirdBlog = blogs[2];

        cy.get(firstBlog).contains('View details').click();
        cy.get(firstBlog).contains('Likes: 150');

        cy.get(secondBlog).contains('View details').click();
        cy.get(secondBlog).contains('Likes: 149');

        cy.get(thirdBlog).contains('View details').click();
        cy.get(thirdBlog).contains('Likes: 120');

        cy.get(secondBlog).contains('Like').click();
        cy.get(secondBlog).contains('Like').click();

        cy.get(secondBlog).contains('Likes: 151');
        cy.get(firstBlog).contains('Likes: 150');
      });
    });
  });
});
