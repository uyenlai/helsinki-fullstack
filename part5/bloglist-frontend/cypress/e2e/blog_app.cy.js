describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testusername',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
})

describe('Login', function() {
  it('succeeds with correct credentials', function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('testusername')
    cy.get('#password').type('testpassword')
    cy.get('#login-button').click()

    cy.contains('Test User logged in')
  })
})

it('fails with wrong credentials', function() {
  cy.visit('http://localhost:3000')
  cy.get('#username').type('testusername')
  cy.get('#password').type('wrongpassword')
  cy.get('#login-button').click()

  cy.contains('Wrong credentials')
})

describe('Blog App', function() {
  describe('When logged in', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('testusername')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.wait(1000)
    })
    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.contains('Create new blog')
      cy.get('#titleInput').type('Test Blog')
      cy.get('#authorInput').type('Test Author')
      cy.get('#urlInput').type('Test Url')
      cy.get('#create-button').click()

      cy.contains('Test Blog by Test Author')
    })

    it('the user can like a blog', function() {
      cy.contains('New blog').click()
      cy.contains('Create new blog')
      cy.get('#titleInput').type('Test Blog')
      cy.get('#authorInput').type('Test Author')
      cy.get('#urlInput').type('Test Url')
      cy.get('#create-button').click()

      cy.contains('Test Blog by Test Author')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })
  })
})