/* eslint-disable */

// This path should be run after the happy path
context('2nd path - accept booking and make review', () => {
  before(() => {
    cy.visit('localhost:3000');
  })
  
  it('accept booking and check profit', () => {

    // Sign in as owner
    const email = 'bruce.wayne@wayne.bat';
    const password = 'IAmTheBatman';

    cy.get('[id=open-dropdown]')
      .click()
      .should('have.attr', 'aria-expanded')
      .and('eq', 'true');
    
    // Click login button in dropdown
    cy.get('[id=button-login]')
      .click();
    
    // Login form should have two fields
    cy.get('input')
      .should('have.length', 2);
    
    // User must input an email and password
    cy.get('input[name=email]')
    .focus()
    .type(email);
  
    cy.get('input[name=password]')
      .focus()
      .type(password);

    // User then submits which takes us back to listing page
    cy.get('button[type=submit]')
      .click();
    
    cy.contains('Successfully logged in!');

    // Go to hosted listings
    cy.get('[id=open-dropdown]')
    .click()
    .should('have.attr', 'aria-expanded')
    .and('eq', 'true');

    cy.contains('Your Listings')
      .parent()
      .click();

    cy.wait(3000);

    const hostedListingName = 'Wayne Manor'
    cy.contains(hostedListingName);

    cy.get('[id=bookingInfoBtn]')
    .click()

    // Accept booking
    cy.get('[id=accept0]')
    .click()

    cy.contains('ACCEPTED')

    // Check profit includes this booking
    const profit = '$ 2000'
    cy.contains(profit)

    // User logs out
    cy.get('[id=open-dropdown]')
      .click()
      .should('have.attr', 'aria-expanded')
      .and('eq', 'true');

    cy.get('[id=button-logout]')
      .click();
    
    // Toast indicates successful logout
    cy.contains('Successfully logged out!');
  })

  it('guest leaves review and rating on accepted booking', () => {
    // Login as guest (of last booking)
    const email = 'jarjar.binks@naboo.ort';
    const password = 'mesaWantHighMarks';

    cy.get('[id=open-dropdown]')
      .click()
      .should('have.attr', 'aria-expanded')
      .and('eq', 'true');
    
    // Click login button in dropdown
    cy.get('[id=button-login]')
      .click();
    
    // Login form should have two fields
    cy.get('input')
      .should('have.length', 2);
    
    // User must input an email and password
    cy.get('input[name=email]')
    .focus()
    .type(email);
  
    cy.get('input[name=password]')
      .focus()
      .type(password);

    // User then submits which should take us back to listing page
    cy.get('button[type=submit]')
      .click();
    
    cy.contains('Successfully logged in!'); 

    cy.wait(4000);

    // User selects the 'Wayne Manor' listing and makes a booking
    cy.contains('Wayne Manor')
      .click()

    // Add review text
    const review = "This was a nice, spacious place. Could have done with more bats though."
    cy.get('textarea')
    .type(review);

    // Select all 5 stars for rating
    cy.get('*[class^="widget-container"]')
    .click({multiple: true})
    
    // Submit the review
    cy.get('[id=submitReviewBtn]')
      .click();
    cy.wait(1000);

    // Check if the review is shown
    cy.contains(review)
  })
})